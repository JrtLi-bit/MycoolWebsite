let hunger = 2.5, thirst = 2.5, boredom = 2.5;
const maxStat = 5;

// Update bars immediately
function updateBars() {
  document.getElementById('hungerBar').style.width = (hunger / maxStat * 100) + '%';
  document.getElementById('thirstBar').style.width = (thirst / maxStat * 100) + '%';
  document.getElementById('boredomBar').style.width = (boredom / maxStat * 100) + '%';
}

// Stat decay
function startDecay() {
  setInterval(() => {
    hunger = Math.max(0, hunger - 0.2);
    thirst = Math.max(0, thirst - 0.2);
    boredom = Math.max(0, boredom - 0.4);
    updateBars();
  }, 3000);
}

// Name pet
function namePet() {
  const input = document.getElementById('petNameInput').value.trim();
  if (input) document.getElementById('gameTitle').textContent = input + ' the Pet 🐾';
}

// Interactions
function feed(type) {
  if (hunger < maxStat) {
    hunger = Math.min(maxStat, hunger + 0.5);
    if (type === 'fish') thirst = Math.min(maxStat, thirst + 0.3);
    document.getElementById('pet').textContent = '😋';
    animatePet(); updateBars();
  }
}

function giveWater() {
  if (thirst < maxStat) {
    thirst = Math.min(maxStat, thirst + 0.5);
    document.getElementById('pet').textContent = '😌';
    animatePet(); updateBars();
  }
}

// Pet animation
function animatePet() {
  const petEl = document.getElementById('pet');
  petEl.style.transform = 'scale(1.2)';
  setTimeout(() => petEl.style.transform = 'scale(1)', 300);
}

// Initialize
updateBars(); startDecay();