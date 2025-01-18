// Elementos del DOM
const amountInput = document.getElementById("amount");
const currencySelect = document.getElementById("currency");
const convertButton = document.getElementById("convert");
const resultDiv = document.getElementById("result");
const chartCanvas = document.getElementById("chart");

let chartInstance = null; // Almacenar instancia del gráfico

// Función para obtener datos desde la API
const fetchData = async (endpoint) => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error("Error al obtener datos de la API");
    return await response.json();
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    throw error;
  }
};

// Función para convertir moneda
const convertCurrency = async () => {
  const amount = parseFloat(amountInput.value);
  const currency = currencySelect.value;

  if (isNaN(amount) || amount <= 0) {
    resultDiv.innerHTML = `<p style="color:red;">Por favor, ingresa un monto válido.</p>`;
    return;
  }

  try {
    const data = await fetchData("https://mindicador.cl/api");
    const exchangeRate = data[currency]?.valor;

    if (!exchangeRate) {
      resultDiv.innerHTML = `<p style="color:red;">No se encontró información para la moneda seleccionada.</p>`;
      return;
    }

    const convertedAmount = (amount / exchangeRate).toFixed(2);
    resultDiv.innerHTML = `<p>${amount} CLP son aproximadamente ${convertedAmount} ${currency.toUpperCase()}.</p>`;

    // Obtener y mostrar los últimos 10 días de datos históricos
    const historicalData = data[currency]?.serie.slice(0, 10).reverse(); // Últimos 10 días
    if (historicalData && historicalData.length > 0) {
      // Muestra los valores en la consola para que puedas verificar
      console.log("Historial de los últimos 10 días:", historicalData);

      // Generar gráfico con el historial
      renderChart(historicalData);
    } else {
      resultDiv.innerHTML += `<p style="color:orange;">No hay datos históricos disponibles para graficar.</p>`;
    }
  } catch (error) {
    console.error(error);
  }

  const data = await fetchData("https://mindicador.cl/api");
console.log(data); // Verifica los datos

};



// Evento del botón
convertButton.addEventListener("click", convertCurrency);

