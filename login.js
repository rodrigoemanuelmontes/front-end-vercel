import "https://cdn.jsdelivr.net/npm/qrcode@1.5.1/build/qrcode.min.js";
const BASE_URL = "http://localhost:3000";

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