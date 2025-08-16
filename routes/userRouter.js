const express = require('express');
const path = require('path');
const userRouter = express.Router();
const rootDir = require('../utils/pathUtil')
const { generateWebsiteCode } = require('../aiAgent');

userRouter.get("/",(req,res,next)=>{
  res.sendFile(path.join(rootDir,'views','index.html'));
})

userRouter.get("/web-builder",(req,res,next)=>{
  res.sendFile(path.join(rootDir,'views','web-builder.html'))
})


userRouter.post("/generate-code", async (req, res) => {
  try {
    const { prompt } = req.body;
    const generatedCode = await generateWebsiteCode(prompt);
    res.json({ code: generatedCode });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate website" });
  }
});

module.exports = userRouter;
