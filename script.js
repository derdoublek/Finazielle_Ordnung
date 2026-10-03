// Berechnung des monatlichen Puffers
function calculatePuffer() {
  const kfz = parseFloat(document.getElementById('kfz').value) || 0;
  const gez = parseFloat(document.getElementById('gez').value) || 0;
  const sonstiges = parseFloat(document.getElementById('sonstiges').value) || 0;

  // Umrechnung: Jährlich / 12, Vierteljährlich / 3
  const monthlyKfz = kfz / 12;
  const monthlyGez = gez / 3;
  const monthlySonstiges = sonstiges / 12;

  const totalMonthly = monthlyKfz + monthlyGez + monthlySonstiges;

  document.getElementById('monthlyPuffer').innerText = 
    totalMonthly.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
}

// Event-Listener für Eingaben
document.getElementById('kfz').addEventListener('input', calculatePuffer);
document.getElementById('gez').addEventListener('input', calculatePuffer);
document.getElementById('sonstiges').addEventListener('input', calculatePuffer);

// Kontaktformular abfangen
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Vielen Dank! Ich melde mich in Kürze bei dir für deine finanzielle Ordnung.');
});