import backIcon from '../pngicons/back.png';
import soundIcon from '../pngicons/sound.png';
import soundwaterfall from '../sounds/smoothwaterfall.mp3';
import sounddeepsynth from '../sounds/deepsynth.mp3';
import reflexionBackground from '../backgrounds/reflexion-background.jpg';
import { navigate } from '../main.js';

export function renderRelaxAmbience(container) {
  container.innerHTML = `
    <div class="nav-buttons">
      <button class="button-home" id="back" data-view="home">
        <img data-view="home" class="icon-home" src="${backIcon}" />
        <p>Back</p>
      </button>
      <h1 class="welcome">Relax Ambience</h1> 
    </div>
    <ul class="question-list">
      <li>
        <div class="quote-container">
          <p class="quote-text">Smooth sound waterfall to reflect deeper</p>
        </div>
        <div class="question-container">
          <button class="button-home sound-btn" data-sound="soundwaterfall">
            <img class="icon-home" src="${soundIcon}" />
            <p>Play</p>
          </button>
        </div>
      </li>
      <li>
        <div class="quote-container">
          <p class="quote-text">Deep Synth Sound</p>
        </div>
        <div class="question-container">
          <button class="button-home sound-btn" data-sound="sounddeepsynth">
            <img class="icon-home" src="${soundIcon}" />
            <p>Play</p>
          </button>
        </div>
      </li>
    </ul>
  `;

  // Backgrounds
  document.querySelectorAll('.background').forEach(el => {
    const bg = el.getAttribute('data-bg');
    if (bg) {
      el.style.backgroundImage = `url(${bg})`;
    }
  });

  // Animación del título
  const h1_move = container.querySelector('.welcome');
  h1_move.style.transform = 'translateY(60px)';
  h1_move.style.opacity = '0';
  setTimeout(() => {
    h1_move.style.opacity = '1';
    h1_move.style.transition = 'opacity 1.8s ease, transform 1s ease';
    h1_move.style.transform = 'translateY(0)';
  }, 100);

  // Botón back
  const back = container.querySelector('#back');
  back.addEventListener('click', (event) => {
    event.preventDefault();
    navigate('home');
  });

  // --- Audio toggle for multiple sounds ---
  const soundsMap = {
    soundwaterfall,
    sounddeepsynth
    // aquí puedes añadir más sonidos en el futuro
  };

  // Crear un objeto Audio para cada botón
  const audioPlayers = {};

  container.querySelectorAll('.sound-btn').forEach(btn => {
    const soundKey = btn.getAttribute('data-sound');
    const audio = new Audio(soundsMap[soundKey]);
    audio.loop = true;
    audioPlayers[soundKey] = audio;

    btn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        btn.querySelector('p').textContent = 'Pause';
      } else {
        audio.pause();
        btn.querySelector('p').textContent = 'Play';
      }
    });
  });
}
