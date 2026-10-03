function handleQuizClick(btn, type) {
  const optionsGroup = btn.parentElement;
  const buttons = optionsGroup.querySelectorAll('.quiz-btn');

  // Alle Buttons in dieser Frage zurücksetzen
  buttons.forEach(b => b.classList.remove('active'));

  // Gewählten Button aktivieren
  btn.classList.add('active');

  // Auswertung durchführen
  checkQuizStatus();
}

function checkQuizStatus() {
  const activeNoButtons = document.querySelectorAll('.btn-no.active');
  const activeYesButtons = document.querySelectorAll('.btn-yes.active');
  
  const totalAnswered = activeNoButtons.length + activeYesButtons.length;
  const noCount = activeNoButtons.length;

  const resultBox = document.getElementById('quizResultBox');
  const resultTitle = document.getElementById('quizResultTitle');
  const resultText = document.getElementById('quizResultText');

  if (totalAnswered > 0) {
    resultBox.style.display = 'block';

    if (noCount > 0) {
      resultTitle.innerText = `🚨 Handlungsbedarf bei ${noCount} von 3 Punkten`;
      resultText.innerText = "Ohne feste Struktur führt das unweigerlich zu unvorhergesehenen Engpässen. Lass uns dein persönliches Sicherheits-System in einer kurzen Datenanalyse einmalig schlüsselfertig aufbauen.";
    } else {
      resultTitle.innerText = "🎉 Vorbildlich strukturiert!";
      resultText.innerText = "Du hast deine Finanzen bereits voll im Griff. Wenn du dein System noch weiter automatisieren möchtest, stehen wir dir jederzeit zur Seite.";
    }
  }
}