document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const cedula = document.getElementById("cedula").value.trim();
  const resultado = document.getElementById("resultado");

  if (cedula === "") {
    resultado.innerHTML = "<p>⚠️ Por favor ingresa tu número de cédula.</p>";
    return;
  }

  // Simulación: puedes tener subcarpetas por evento
  const rutas = [
    `certificados/MUN/${cedula}.pdf`,
    `certificados/SemanaPaz/${cedula}.pdf`,
    `certificados/ForoEstudiantil/${cedula}.pdf`
  ];

  let encontrado = false;

  Promise.any(
    rutas.map(url => fetch(url).then(r => r.ok ? url : Promise.reject()))
  )
  .then(certURL => {
    resultado.innerHTML = `
      ✅ Certificado encontrado.<br>
      <a href="${certURL}" download>Descargar certificado</a>
    `;
  })
  .catch(() => {
    resultado.innerHTML = "❌ No se encontró ningún certificado asociado a esa cédula en los eventos disponibles.";
  });
});
