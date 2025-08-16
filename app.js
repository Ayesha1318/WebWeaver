const env = require("dotenv").config();
const path = require('path');
const express = require('express');
const { generateWebsiteCode } = require("./aiAgent");

const app = express();
const userRouter = require('./routes/userRouter');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
const rootDir = require('./utils/pathUtil');
app.use(userRouter);

app.use(express.static(path.join(rootDir,'public')));



const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
  console.log(`Server is running on: http://localhost:${PORT}`);
})

module.exports = app;