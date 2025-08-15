const env = require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

async function generateWebsiteCode(userPrompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Build a single, standalone HTML file for this request:

"${userPrompt}"

Requirements:
- return ONE complete <html> document
- put all CSS inside a <style> tag
- put all JS inside a <script> tag
- no external CDN links`,
            },
          ],
        },
      ],
      config: {
        systemInstruction:
          "You are a frontend code generator. Output only a complete HTML document (no markdown).",
      },
    });

    const html = response && response.text ? response.text.trim() : "";
    return html || "<h1>No code generated</h1>";
  } catch (err) {
    console.error("Error generating website code:", err);
    throw err;
  }
}

module.exports = { generateWebsiteCode };
