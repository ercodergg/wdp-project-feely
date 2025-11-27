import levelIcon from '../pngicons/level.png';
import planIcon from '../pngicons/plan.png';
import tickIcon from '../pngicons/tick.png';

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
      <div class="quote-container">
        <p class="quote-text">“${randomQuote}”</p>
      </div>
      <button class="button-home" id="write">
        <img class="icon-home" src="./src/pngicons/light.png" alt="Write" />
        <p>Write your own quote ideas</p>
      </button>
      <div class="background"></div>
      <p>Here you can write down <br> the quotes you want to see everyday</p>
    </section>
  </div>
</section>
<section class="home-section">
  <div class="left-column">
    <div class="text-block">
      <p>Here you can write down the quotes you want to see everyday</p>
      <p>Here you can write down the quotes you want to see everyday</p>
      <p>Here you can write down the quotes you want to see everyday</p>
    </div>
  </div>
  <div class="right-column">
    <div class="reflexion-container">
      <p>Here you can write down the quotes you want to see everyday</p>
      <p>Here you can write down the quotes you want to see everyday</p>
      <p>Here you can write down the quotes you want to see everyday</p>
    </div>
  </div>
</section>


  `

  const h1_move = container.querySelector('.welcome');
  h1_move.style.transform = 'translateY(60px)';
  h1_move.style.opacity = '0';

  setTimeout(() => {


    h1_move.style.opacity = '1';
    h1_move.style.transition = 'opacity 1.8s ease, transform 1s ease';
    h1_move.style.transform = 'translateY(0)';
  }, 100)
}
