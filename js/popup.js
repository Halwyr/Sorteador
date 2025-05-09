function showPopup(titulo, mensagem) {
  document.getElementById("popup-title").innerHTML = titulo;
  document.getElementById("popup-message").innerText = mensagem;

  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");

  popup.classList.add("show");
  overlay.classList.add("show");
}

function closePopup() {
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");

  popup.classList.remove("show");
  overlay.classList.remove("show");
}