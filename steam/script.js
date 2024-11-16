// Calculadora de precios de juegos en steam
// Autora: Alexia Michelle <alexia@goldendoglinux.org>
// Licencia: GNU GPL 3.0
// Lógica

// Notas adicionales:
// Esto funciona tomando el valor actual de dolar.txt
// La logica de esto no está incluída en este software
// ya que scrappeo un sitio, limpio y paso el valor diario
// al repositorio.
// deben buscar la manera de obtener este dato de algun modo u otro
// y colocarlo en dolar.txt

const calculatorForm = document.getElementById('calculator-form');
const steamPriceInput = document.getElementById('steam-price');
const calculateButton = document.getElementById('calculate-button');
const resultParagraph = document.getElementById('result');

calculateButton.addEventListener('click', (e) => {
  e.preventDefault();
  const steamPrice = parseFloat(steamPriceInput.value);
  if (isNaN(steamPrice)) {
    alert('Por favor, ingresa un precio válido');
    return;
  }

  fetch('dolar.txt')
    .then(response => response.text())
    .then(dolarValue => {
      const convertedPrice = steamPrice * parseFloat(dolarValue);
      const finalPrice = convertedPrice * 1.6;
      resultParagraph.textContent = `El juego te va a costar ${finalPrice.toFixed(2)} en tu resumen de tu tarjeta`;
    })
    .catch(error => console.error('Error fetching dolar value:', error));
});
