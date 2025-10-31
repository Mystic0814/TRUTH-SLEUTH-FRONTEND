// =================== IMPORTANT ===================
// Replace the API_URL below with your Render backend URL after deployment.
// Example: https://truthsleuth-backend.onrender.com/api/check
// ==================================================

// ✅ Backend API endpoint (Render)
const API_URL = "https://truth-sleuth-backend.onrender.com/analyze";

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

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();

    // ✅ Handle valid backend response
    if (data.score !== undefined && data.classification) {
      resultDiv.innerHTML = `
        <h3>Credibility Score: ${data.score}/100</h3>
        <p><strong>Classification:</strong> ${data.classification}</p>
        <p><strong>Reasoning:</strong> ${data.reasoning}</p>
        <p><strong>Key Indicators:</strong></p>
        <ul>${data.indicators.map(i => `<li>${i}</li>`).join('')}</ul>
        <p><strong>Concerns:</strong></p>
        <ul>${data.concerns.map(c => `<li>${c}</li>`).join('')}</ul>
      `;
    } else if (data.error) {
      resultDiv.textContent = "Error: " + data.error;
    } else {
      resultDiv.textContent = "Unexpected response format. Please try again.";
    }

  } catch (err) {
    console.error(err);
    resultDiv.textContent = "Could not connect to backend. Make sure the backend URL is correct and CORS is enabled.";
  }
}

