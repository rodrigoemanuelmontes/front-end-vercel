import QRCode from "https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js";

const BASE_URL = "http://localhost:3000";


// Login
if(document.getElementById('login-btn')){
  document.getElementById('login-btn').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if(data.success){
      localStorage.setItem("token", data.token);
      alert("Login exitoso");
      window.location.href = "index.html";
    } else {
      alert("Email o contraseña incorrecta");
    }
  });
}

// Cargar evento único
if(document.getElementById('event-name')){
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
}

// Validar ticket
if(document.getElementById('validate-btn')){
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
}