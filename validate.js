import "https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js";
const BASE_URL = "http://localhost:3000";

document.getElementById('validate-btn').addEventListener('click', async () => {
  const ticketId = document.getElementById('ticket-id').value;
  const res = await fetch(`${BASE_URL}/validar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ticketId })
  });
  const data = await res.json();
  document.getElementById('validation-result').textContent = data.valido
    ? "Ticket válido ✅"
    : "Ticket inválido ❌ - " + data.mensaje;
});