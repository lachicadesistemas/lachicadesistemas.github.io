const countdownElement = document.getElementById('countdown');
const targetDate = new Date('2024-11-17T00:00:00');

function updateCountdown() {
  const now = new Date();
  const timeLeft = targetDate.getTime() - now.getTime();

  if (timeLeft <= 0) {
    countdownElement.textContent = 'La fecha objetivo ha sido alcanzada';
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  countdownElement.textContent = `Faltan ${days} días ${hours} horas ${minutes} minutos y ${seconds} segundos`;
}

updateCountdown();
setInterval(updateCountdown, 1000);
