import backIcon from '../pngicons/back.png';
import soundIcon from '../pngicons/sound.png';
import soundwaterfall from '../sounds/smoothwaterfall.mp3';
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
    <ul>
      <li>
        <div class="quote-container">
          <p class="quote-text">Smooth sound waterfall to reflect deeper</p>
        </div>
        <div class="question-container">
          <button class="button-home" id="sound-btn">
            <img class="icon-home" src="${soundIcon}" />
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

  // --- Audio toggle ---
  const audio = new Audio(soundwaterfall);
  audio.loop = true; // opcional: que se repita en bucle

  const soundBtn = container.querySelector('#sound-btn');
  soundBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      soundBtn.querySelector('p')?.remove(); // opcional: limpiar texto
      soundBtn.insertAdjacentHTML('beforeend', '<p>Pause</p>');
    } else {
      audio.pause();
      soundBtn.querySelector('p')?.remove();
      soundBtn.insertAdjacentHTML('beforeend', '<p>Play</p>');
    }
  });
}
