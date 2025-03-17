const massInput = document.getElementById('mass');
const molarMassInput = document.getElementById('molarMass');
const resultDiv = document.getElementById('result');
const calculateButton = document.getElementById('calculateButton');

const historyContainer = document.createElement('div');
historyContainer.classList.add('history-container');
document.body.appendChild(historyContainer);

const clearHistoryButton = document.getElementById('clearHistoryButton');

function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

window.onload = () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
  }
  validateInputs();
  displayHistory();
};

function calculateMoles() {
  const mass = parseFloat(massInput.value);
  const molarMass = parseFloat(molarMassInput.value);
  
  if (isNaN(mass) || isNaN(molarMass) || mass < 0 || molarMass <= 0) {
    resultDiv.innerText = "Please enter valid numbers.";
    resultDiv.classList.remove('show');
    return;
  }
  
  const moles = mass / molarMass;
  resultDiv.innerText = `Number of moles: ${moles.toFixed(4)}`;
  resultDiv.classList.add('show');  

  saveCalculation(mass, molarMass, moles);
}

function saveCalculation(mass, molarMass, moles) {
  const calculation = {
    mass,
    molarMass,
    moles,
    timestamp: new Date().toLocaleString(),
  };

  let history = JSON.parse(localStorage.getItem('history')) || [];
  history.push(calculation);
  
  
  if (history.length > 5) history.shift();

  localStorage.setItem('history', JSON.stringify(history));
  displayHistory();
}

function displayHistory() {
  let history = JSON.parse(localStorage.getItem('history')) || [];
  historyContainer.innerHTML = '<h2>Past Calculations</h2>';
  
  if (history.length === 0) {
    historyContainer.style.display = 'none';
    return;
  }

  historyContainer.style.display = 'block';
  history.forEach(calc => {
    const entry = document.createElement('p');
    entry.innerText = `${calc.timestamp}: ${calc.mass}g / ${calc.molarMass}g/mol = ${calc.moles.toFixed(4)} moles`;
    historyContainer.appendChild(entry);
  });
}

function clearHistory() {
  localStorage.removeItem('history');  
  historyContainer.innerHTML = '<h2>Past Calculations</h2><p>No history available.</p>';
  historyContainer.style.display = 'none';
}

function clearFields() {
  massInput.value = '';
  molarMassInput.value = '';
  resultDiv.innerText = '';
}

function redirectToLink() {
  window.location.href = 'https://chemistryhub.carrd.co/';
}

function validateInputs() {
  const mass = parseFloat(massInput.value);
  const molarMass = parseFloat(molarMassInput.value);
  calculateButton.disabled = isNaN(mass) || isNaN(molarMass) || molarMass <= 0;
}

massInput.addEventListener('input', validateInputs);
molarMassInput.addEventListener('input', validateInputs);
document.getElementById('redirectButton').addEventListener('click', redirectToLink);
clearHistoryButton.addEventListener('click', clearHistory);
