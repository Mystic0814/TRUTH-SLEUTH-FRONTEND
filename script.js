// =================== IMPORTANT ===================
// Replace the API_URL below with your Render backend URL after deployment.
// Example: https://truthsleuth-backend.onrender.com/api/check
// ==================================================

const API_URL = "https://truth-sleuth-backend.onrender.com/analyze"; // your Render backend URL

document.getElementById('analyzeBtn').addEventListener('click', analyze);

async function analyze() {
  const input = document.getElementById('input').value.trim();
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = "Analyzing...";

  if (!input) {
    resultDiv.textContent = "Please enter some text to analyze.";
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input })
    });

    const data = await res.json();

    if (data.error) {
      resultDiv.textContent = "Error: " + data.error;
      return;
    }

    // Format the backend response nicely
    const output = `
      🧠 Credibility Score: ${data.score ?? "N/A"}/100
      🏷️ Classification: ${data.classification ?? "N/A"}
      🔍 Indicators:
      - ${(data.indicators || []).join('\n- ') || "None"}

      ⚠️ Concerns:
      - ${(data.concerns || []).join('\n- ') || "None"}

      💬 Reasoning:
      ${data.reasoning || "No reasoning provided."}
    `;

    resultDiv.textContent = output;

  } catch (err) {
    console.error(err);
    resultDiv.textContent = "Could not connect to backend. Make sure the backend URL is correct and CORS is enabled.";
  }
}
