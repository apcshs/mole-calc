const massInput = document.getElementById('mass');
const molarMassInput = document.getElementById('molarMass');
const resultDiv = document.getElementById('result');
const calculateButton = document.getElementById('calculateButton');

const historyContainer = document.createElement('div');
historyContainer.classList.add('history-container');
document.body.appendChild(historyContainer);

const clearHistoryButton = document.getElementById('clearHistoryButton');

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  showToast(isDark ? "Dark Mode Enabled" : "Light Mode Enabled");
}

window.onload = () => {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
  } else if (theme === 'light') {
    document.body.classList.add('light-theme');
  }
  validateInputs();
  displayHistory();
  massInput.focus(); 
};

function calculateMoles() {
  const mass = parseFloat(massInput.value);
  const molarMass = parseFloat(molarMassInput.value);

  if (isNaN(mass) || isNaN(molarMass) || mass <= 0 || molarMass <= 0) {
    resultDiv.innerHTML = '<p style="color: red;">Please enter valid positive numbers.</p>';
    resultDiv.classList.remove('show');
    return;
  }

  const moles = mass / molarMass;
  resultDiv.innerHTML = `<p>Moles: ${moles.toFixed(2)} mol</p>`; 
  resultDiv.classList.add('show');

  
  resultDiv.classList.add('highlight');
  setTimeout(() => resultDiv.classList.remove('highlight'), 1000);

  saveCalculation(mass, molarMass, moles);

  
  showToast("Calculation saved!");
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
  
  
  if (history.length > 10) history.shift();

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

  
  historyContainer.scrollIntoView({ behavior: 'smooth' });
}

function clearHistory() {
  localStorage.removeItem('history');  
  historyContainer.innerHTML = '<h2>Past Calculations</h2><p>No history available.</p>';
  historyContainer.style.display = 'none';
  showToast("History Cleared!"); 
}

function clearFields() {
  massInput.value = '';
  molarMassInput.value = '';
  resultDiv.innerText = '';
  resultDiv.classList.remove('show'); 
}

function redirectToLink() {
  window.location.href = 'https://chemistryhub.carrd.co/';
}

function validateInputs() {
  const mass = parseFloat(massInput.value);
  const molarMass = parseFloat(molarMassInput.value);
  calculateButton.disabled = isNaN(mass) || isNaN(molarMass) || molarMass <= 0;
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.innerText = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.background = '#333';
  toast.style.color = '#fff';
  toast.style.padding = '10px 20px';
  toast.style.borderRadius = '5px';
  toast.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
  toast.style.zIndex = 9999;
  toast.style.opacity = 0;
  toast.style.transition = 'opacity 0.5s';

  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = 1; }, 100);
  setTimeout(() => {
    toast.style.opacity = 0;
    setTimeout(() => document.body.removeChild(toast), 500);
  }, 2000);
}

massInput.addEventListener('input', validateInputs);
molarMassInput.addEventListener('input', validateInputs);
document.getElementById('redirectButton').addEventListener('click', redirectToLink);
clearHistoryButton.addEventListener('click', clearHistory);
calculateButton.addEventListener('click', calculateMoles);

document.addEventListener('keydown', (e) => {
  const calculateButton = document.getElementById('calculateButton');
  if (e.key === 'Enter' && !calculateButton.disabled) {
    calculateMoles();
  }
});
