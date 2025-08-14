import "https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js";
const BASE_URL = "http://localhost:3000";

// Cargar evento único
fetch(`${BASE_URL}/eventos`)
  .then(res => res.json())
  .then(e => {
    document.getElementById('event-name').textContent = e.nombre;
    document.getElementById('event-date').textContent = e.fecha;
    document.getElementById('event-price').textContent = "$" + e.precio;
  });

// Comprar ticket
document.getElementById('buy-btn').addEventListener('click', async () => {
  const qty = parseInt(document.getElementById('ticket-qty').value);
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/comprar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ cantidad: qty })
  });
  const data = await res.json();
  if(data.success){
    // Generar QR en el frontend
    QRCode.toDataURL(data.ticketId).then(url => {
      document.getElementById('qr-img').src = url;
    });
    alert("Ticket comprado correctamente!");
  } else {
    alert("Error al comprar ticket");
  }
});