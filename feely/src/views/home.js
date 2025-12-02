import levelIcon from '../pngicons/level.png';
import planIcon from '../pngicons/plan.png';
import tickIcon from '../pngicons/tick.png';
import logoutIcon from '../pngicons/logout.png';
import { navigate } from '../main.js';
const quotes = [
  "Breathe, feel, be honest with yourself.",
  "Your emotions are valid, even when messy.",
  "Pause. Listen. Let it move through you.",
  "You are allowed to feel everything.",
  "Naming your feeling is the first step to healing.",
  "Softness is strength. Vulnerability is clarity."
];

export function renderHome(container) {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
  const storedUser = localStorage.getItem('user');
  let user = JSON.parse(storedUser);
  const username = user ? user.username : 'User';
  container.innerHTML = `
    <button class="back-button" id="logout"> 
    <img data-view="check" class="icon-home" src="${logoutIcon}"/>
    <b>Logout</b>
    </button>
    <h1 class="welcome">Welcome to Feely!!</h1>

<section class="home-section">
  <!-- Columna izquierda: lista de preguntas -->
  <div class="left-column">
    <ul class="question-list">
      <li>
        <div class="question-container">
          <div class="text-block">
            <h3>${username} how are you feeling now?</h3>
            <p>Achieve happiness that lasts</p>
          </div>
          <button class="button-home" data-view="check">
            <img data-view="check" class="icon-home" src="${levelIcon}" />
            <b data-view="check">Check your feelings</b>
          </button>
        </div>
      </li>
      <li>
        <div class="question-container">
          <div class="text-block">
            <h3>Create your goals</h3>
            <p>Achieve happiness that lasts</p>
          </div>
          <button class="button-home" data-view="goals">
            <img data-view="goals" class="icon-home" src="${tickIcon}" />
            <b data-view="goals">Check your goals</b>
          </button>
        </div>
      </li>
    </ul>
  </div>

  <!-- Columna derecha: reflexión -->
  <div class="right-column">
    <section class="reflexion-container">
      <div class="background" data-bg="./src/backgrounds/relax1-background.jpg"></div>
    </section>
  </div>
</section>
<section class="home-section">
  <div class="left-column">
      <div class="reflexion-container">
      <div class="background" data-bg="./src/backgrounds/reflexion-background.jpg"></div>
      <div class="quote-container">
      <p class="quote-text">Write down the new goals you have and then check them when completed.</p>
      </div>
      <button class="button-home" id="write">
<img class="icon-home" src="./src/pngicons/light.png" alt="Write" />
<b>Write your own quote ideas</b>
</button>
      <p>Here you can write down</p>
      <p>the quotes you want see everyday</p>
  </div>
  <div class="right-column">
      <section class="reflexion-container">
      <p>Write down what you would like to read</p>   
      <p> when you wake up, </p>
      <p>when you are lost, </p>
      <p>what connects you with yourself.</p>
       </div>
    </section>
  </div>
</section>
<section class="home-section">
  <div class="left-column">
  <section class="reflexion-container">
  <button class="button-home" id="write">
        <img data-view="goals" class="icon-home" src="${tickIcon}" />
    <b>Create your goals</b>
  </button>
      <div class="quote-container">
        <p class="quote-text">Write down the new goals you have and then check them when completed.</p>
      </div>
      <div class="background" data-bg="./src/backgrounds/note-background.jpg"></div>
    </section>
  </div>
  <div class="right-column">
    <div class="reflexion-container">
        <p>Ideally, you should start with</p>
      <p>short-term goals.</p>
      <p>This gives you momentum,</p>
      <p>clarity, and confidence.</p> 
    </div>
  </div>
</section>


  `
  document.querySelectorAll('.background').forEach(el => {
    const bg = el.getAttribute('data-bg');
    if (bg) {
      el.style.backgroundImage = `url(${bg})`;
    }
  });

  const h1_move = container.querySelector('.welcome');
  h1_move.style.transform = 'translateY(60px)';
  h1_move.style.opacity = '0';

  let blogout = container.querySelector('#logout');
  blogout.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.clear();

    navigate('login');
  });

  setTimeout(() => {


    h1_move.style.opacity = '1';
    h1_move.style.transition = 'opacity 1.8s ease, transform 1s ease';
    h1_move.style.transform = 'translateY(0)';
  }, 100)
}
