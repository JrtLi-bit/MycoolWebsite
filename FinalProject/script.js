let petName = '';
let hunger = 100;
let thirst = 100;
let boredom = 100;

const petNameInput = document.getElementById('pet-name-input');
const petNameDisplay = document.getElementById('pet-name');
const petDisplay = document.getElementById('pet-display');
const petElement = document.getElementById('pet');
const hungerBar = document.getElementById('hunger-bar');
const thirstBar = document.getElementById('thirst-bar');
const boredomBar = document.getElementById('boredom-bar');
const message = document.getElementById('message');

function setPetName() {
  petName = petNameInput.value.trim();
  if (petName) {
    petNameDisplay.textContent = petName;
    document.getElementById('pet-name-container').classList.add('hidden');
    petDisplay.classList.remove('hidden');
    updateStatus();
    startDecay();
  }
}

function updateStatus() {
  hungerBar.style.width = `${hunger}%`;
  thirstBar.style.width = `${thirst}%`;
  boredomBar.style.width = `${boredom}%`;

  if (hunger < 30 || thirst < 30 || boredom < 30) {
    petElement.textContent = '😿';
    message.textContent = `${petName} needs attention!`;
  } else {
    petElement.textContent = '😺';
    message.textContent = `${petName} is happy!`;
  }
}

function feedPet(food) {
  switch(food) {
    case 'meat':
      hunger = Math.min(hunger + 20, 100);
      break;
    case 'fish':
      hunger = Math.min(hunger + 15, 100);
      break;
    case 'milk':
      hunger = Math.min(hunger + 10, 100);
      thirst = Math.min(thirst + 10, 100);
      break;
  }
  updateStatus();
}

function giveWater() {
  thirst = Math.min(thirst + 20, 100);
  updateStatus();
}

function playWithPet() {
  boredom = Math.min(boredom + 20, 100);
  hunger = Math.max(hunger - 5, 0);
  thirst = Math.max(thirst - 5, 0);
  updateStatus();
}

function startDecay() {
  setInterval(() => {
    hunger = Math.max(hunger - 1, 0);
    thirst = Math.max(thirst - 1, 0);
    boredom = Math.max(boredom - 1, 0);
    updateStatus();
  }, 1000);
}
