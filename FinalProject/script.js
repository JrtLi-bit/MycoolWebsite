let hunger = 2.5, thirst = 2.5, boredom = 2.5;
const maxStat = 5;

const DEFAULT_GIF = 'gifs/待机.gif';
const EAT_GIF     = 'gifs/吃肉.gif';
const DRINK_GIF   = 'gifs/喝水.gif';
const FISH_GIF    = 'gifs/吃鱼.gif';
const PLAY_GIF    = 'gifs/被摸.gif';

const sfxMeat  = new Audio('sounds/eating1.mp3');
const sfxFish  = new Audio('sounds/eating2.mp3');
const sfxWater = new Audio('sounds/drinking.mp3');
const sfxPet   = new Audio('sounds/meow.mp3');

[sfxMeat, sfxFish, sfxWater, sfxPet].forEach(sfx => sfx.load());

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
  if (input) document.getElementById('gameTitle').textContent = input + ' the Cat 🐾';
}

function flashPetGif(tempSrc, duration = 800) {
  const petEl = document.getElementById('pet');
  petEl.src = tempSrc;
  setTimeout(() => {
    petEl.src = DEFAULT_GIF;
  }, duration);
}

// Interactions
function feed(type) {
  if (hunger < maxStat) {
    hunger = Math.min(maxStat, hunger + 0.5);
    if (type === 'fish') thirst = Math.min(maxStat, thirst + 0.3);

    // play the matching SFX
    if (type === 'fish') sfxFish.play();
    else                sfxMeat.play();

    flashPetGif(EAT_GIF, 1000);
    animatePet();
    updateBars();
  }
}

function giveWater() {
  if (thirst < maxStat) {
    thirst = Math.min(maxStat, thirst + 0.5);

    // water SFX
    sfxWater.play();

    flashPetGif(DRINK_GIF, 1000);
    animatePet();
    updateBars();
  }
}

function eatFish() {
  // only run if there's room to grow hunger
  if (hunger < maxStat) {
    // play the fish-eating sound
    sfxFish.play();

    // fish fills hunger and a bit of thirst
    hunger = Math.min(maxStat, hunger + 0.5);
    thirst = Math.min(maxStat, thirst + 0.3);

    // flash the fish-eating GIF, then back to default
    flashPetGif(FISH_GIF, 1000);

    // same visual feedback as other interactions
    animatePet();
    updateBars();
  }
}

function clickPet() {
  // play the “petting” sound
  sfxPet.play();

  // bump boredom
  boredom = Math.min(maxStat, boredom + 0.5);
  updateBars();

  // visual feedback
  flashPetGif(PLAY_GIF, 1000);
  animatePet();
}

// Pet animation
function animatePet() {
  const petEl = document.getElementById('pet');
  petEl.style.transform = 'scale(1.2)';
  setTimeout(() => petEl.style.transform = 'scale(1)', 300);
}



// Initialize
updateBars(); startDecay();