import levelIcon from '../pngicons/level.png'
import planIcon from '../pngicons/plan.png'

const quotes = [
  "Breathe, feel, be honest with yourself.",
  "Your emotions are valid, even when messy.",
  "Pause. Listen. Let it move through you.",
  "You are allowed to feel everything.",
  "Naming your feeling is the first step to healing.",
  "Softness is strength. Vulnerability is clarity."
]

export function renderHome(container) {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  container.innerHTML = `
    <h1 id="welcome">Welcome to Feely!!</h1>
    <div class="quote-container">
      <h3 id="quote-text">“${randomQuote}”</h3>
    </div>
    <section class="buttons-home">
      <a data-view="level-now">
        <img class="icon-home" id="level" src="${levelIcon}" />
      </a>
      <a data-view="week-plan">
        <img class="icon-home" id="plan" src="${planIcon}" />
      </a>
    </section>
  `

  // Transición suave al cargar la quote
  const quoteEl = container.querySelector('#quote-text')
  const h1_move = container.querySelector('#welcome');
  h1_move.style.transform = 'translateY(60px)'
  h1_move.style.opacity = '0'
  quoteEl.style.opacity = '0'
  quoteEl.style.transform = 'translateX(10px)'
  setTimeout(() => {
    quoteEl.style.transition = 'opacity 1s ease, transform 1s ease'
    quoteEl.style.opacity = '1'
    h1_move.style.opacity = '1'
    h1_move.style.transition = 'opacity 1.8s ease,transform 1s ease'
    quoteEl.style.transform = 'translateY(0)'
    h1_move.style.transform = 'translateY(0)'
  }, 100)
}
