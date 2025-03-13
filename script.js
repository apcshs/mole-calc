function toggleTheme() {
  document.body.classList.toggle('dark-theme');
}

function calculateMoles() {
  const mass = parseFloat(document.getElementById('mass').value);
  const molarMass = parseFloat(document.getElementById('molarMass').value);
  if (isNaN(mass) || isNaN(molarMass) || molarMass <= 0) {
    document.getElementById('result').innerText = "Please enter valid numbers.";
    return;
  }
  const moles = mass / molarMass;
  document.getElementById('result').innerText = `Number of moles: ${moles.toFixed(4)}`;
}

function clearFields() {
  document.getElementById('mass').value = '';
  document.getElementById('molarMass').value = '';
  document.getElementById('result').innerText = '';
}

function redirectToLink() {
  window.location.href = 'https://chemistryhub.carrd.co/';
}

document.getElementById('redirectButton').addEventListener('click', redirectToLink);
