import levelIcon from '../pngicons/level.png';
import planIcon from '../pngicons/plan.png';
import tickIcon from '../pngicons/tick.png';
import logoutIcon from '../pngicons/logout.png';
import drawIcon from '../pngicons/draw.png';
import { navigate } from '../main.js';
import Smooothy from 'smooothy';

// variable global accesible en navigate



export async function renderHome(container) {

  const storedUser = localStorage.getItem('user');
  let user = JSON.parse(storedUser);
  const username = user ? user.username : 'User';

  let randomQuoteObj;
  try {
    const res = await fetch('http://localhost:3000/quotes/random');
    if (res.status === 404) {
      randomQuoteObj = { quote: "No quotes yet, add one!", author: "System" };
    } else if (!res.ok) {
      throw new Error("No se pudo obtener quotes");
    } else {
      randomQuoteObj = await res.json();
    }
  } catch (error) {
    console.error("Error consultando el servidor de quotes", error);
    randomQuoteObj = { quote: "Error loading quotes", author: "System" };
  }

  const randomQuote = randomQuoteObj.quote;
  const randomAuthor = randomQuoteObj.author;

  container.innerHTML = `
  <div class="nav-buttons">
  <button class="button-home" id="logout"> 
  <img data-view="check" class="icon-home" src="${logoutIcon}"/>
  <b>Logout</b>
  </button>
  <h1 class="welcome">Welcome to Feely!!</h1>
  </div>

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
          <p class="quote-text">"${randomQuote}" <br/>
            ${randomAuthor}</p>
      </div>
      <button class="button-home" data-view="quotes">
        <img class="icon-home" data-view="quotes" src="./src/pngicons/light.png" />
        <b data-view="quotes" >Write your own quote ideas</b>
      </button>
        <p>Here you can write down</p>
        <p>the quotes you want see everyday</p>
  </div>
</section>
<section class="home-section">
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
  <button data-view="notes" class="button-home"> 
  <img data-view="notes" class="icon-home" src="${drawIcon}"/>
  <b data-view="notes" >Create your notes</b>
  </button>
      <div class="quote-container">
        <p class="quote-text">Write down the new goals you have and then check them when completed.</p>
      </div>
      <div class="background" data-bg="./src/backgrounds/note-background.jpg"></div>
    </section>
  </div>
  <div class="right-column">
    <div class="reflexion-container">
        <p>Write down your thoughts, and organize</p>
      <p>ideas, and emotions </p>
      <p>to free your mind</p>
      <p>what really matters.</p> 
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
