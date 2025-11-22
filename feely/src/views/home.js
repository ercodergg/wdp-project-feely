import levelIcon from '../pngicons/level.png';
import planIcon from '../pngicons/plan.png';

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
    <div class="question-container">
    <h3 id="question-text">${username} how are you feeling now?</h3>
            <button class="button-home" data-view="check">
            <img data-view="check" class="icon-home" src="${levelIcon}"/>
            <b data-view="check">Check your feelings</b>
            </button>
    </div>

  <section class="reflexion-container">
      <div class="quote-container">
    <p id="quote-text">“${randomQuote}”</p>
    </div>
  <button class="button-home" id="write">
    <img class="icon-home" src="./src/pngicons/light.png" alt="Write" />
    <p>Write your own quote ideas</p>
  </button>
  <div class="background"></div>
  <p>Here you can write down <br> the quotes you want to see everyday</p>

  </section>

    <p>Here you can write down <br> the quotes you want to see everyday</p>
  <p>Here you can write down <br> the quotes you want to see everyday</p>
  <p>Here you can write down <br> the quotes you want to see everyday</p>
  <p>Here you can write down <br> the quotes you want to see everyday</p>
  <p>Here you can write down <br> the quotes you want to see everyday</p>
  <p>Here you can write down <br> the quotes you want to see everyday</p>
  <p>Here you can write down <br> the quotes you want to see everyday</p>

  `
  const questionEl = container.querySelector('#question-text')
  questionEl.style.opacity = '0'
  questionEl.style.transform = 'translateX(10px)'

  const quoteEl = container.querySelector('#quote-text')
  quoteEl.style.opacity = '0'
  quoteEl.style.transform = 'translateX(-10px)'

  const h1_move = container.querySelector('.welcome');
  h1_move.style.transform = 'translateY(60px)';
  h1_move.style.opacity = '0';

  setTimeout(() => {
    quoteEl.style.transition = 'opacity 1s ease, transform 1s ease'
    quoteEl.style.opacity = '1'
    quoteEl.style.transform = 'translateY(0)'

    questionEl.style.transition = 'opacity 1s ease, transform 1s ease'
    questionEl.style.opacity = '1'
    questionEl.style.transform = 'translateY(0)'

    h1_move.style.opacity = '1';
    h1_move.style.transition = 'opacity 1.8s ease, transform 1s ease';
    h1_move.style.transform = 'translateY(0)';
  }, 100)
}
