console.log("Script loaded");


window.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("generateBtn");

    if (!btn) {
        console.error("Generate button not found!");
        return;
    }

    btn.addEventListener("click", () => {
        console.log("Generate button clicked!");
    });
});

console.log("Generate Btn element:", document.getElementById("generateBtn"));

const generateBtn = document.getElementById("generateBtn");

generateBtn.addEventListener("click", () => {
    generateBtn.style.transform = "scale(1.2)";
    generateBtn.style.transition = "transform 0.2s ease";

    // Optional: shrink back after a short delay
    setTimeout(() => {
        generateBtn.style.transform = "scale(1)";
    }, 200);
});
document.getElementById("generateBtn").addEventListener("click", async () => {
    console.log("Generate button clicked!"); // ✅ Check if button works

    const prompt = document.getElementById("promptInput").value;
    console.log("Prompt entered:", prompt);

    try {
        const res = await fetch("/generate-code", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });

        console.log("Response status:", res.status);

        const data = await res.json();
        console.log("Data from server:", data);

        if (data.code) {
            codeSection.textContent = data.code;
            generatedHTML = data.code;
        } else {
            codeSection.textContent = "Error generating code.";
        }
    } catch (err) {
        console.error("Fetch error:", err);
    }
});
