import levelIcon from '../pngicons/level.png';
export function renderCheck(container) {
  container.innerHTML = `
    <button class="back-button"  data-view="home"> < Back</button>
    <h1 class="welcome">Check</h1> 
    
<h3 class="quote-text text-block" id="name-message"></h3>
    <ul class="question-list">
      <li>
        <div class="quote-container">
            <p class="quote-text"> Energy: Can yoy workout or be focused?</p>
        </div>
        <div class="question-container">
          <button class="button-home" data-view="check">
            <img data-view="check" class="icon-home" " />
            <b data-view="check">Tired</b>
          </button>
          <button class="button-home" data-view="check">
            <img data-view="check" class="icon-home" " />
            <b data-view="check">Enough</b>
          </button>
          <button class="button-home" data-view="check">
            <img data-view="check" class="icon-home" " />
            <b data-view="check">Energetic</b>
          </button>
        </div>
      </li>
      <li >
        <div class="quote-container">
            <p class="quote-text">Expectations: How do you feel about
            the future?</p>
        </div>
        <div class="question-container">
          <button class="button-home" data-view="check">
            <img data-view="check" class="icon-home" />
            <b data-view="check">Pesimist</b>
          </button>
          <button class="button-home" data-view="check">
            <img data-view="check" class="icon-home" " />
            <b data-view="check">Nihilist</b>
          </button>
          <button class="button-home" data-view="check">
            <img data-view="check" class="icon-home" " />
            <b data-view="check">Optimism</b>
          </button>
        </div>
      </li>
      
      <li>
        <div class="quote-container">
            <p class="quote-text">Fulfillment: How do you feel about, the 
            things you are currently doing?</p>
        </div>
        <div class="question-container">
          <button class="button-home" data-view="check">
            <img data-view="check" class="icon-home" " />
            <b data-view="check">Sad</b>
          </button>
          <button class="button-home" data-view="check">
            <img data-view="check" class="icon-home" " />
            <b data-view="check">Neutral</b>
          </button>
          <button class="button-home" data-view="check">
            <img data-view="check" class="icon-home" " />
            <b data-view="check">Happy</b>
          </button>
        </div>
      </li>
      
      <button class="button-home" id="write">
      <img class="icon-home" src="./src/pngicons/light.png" alt="Write" />
      <p>Write your own quote ideas</p>
      </button>
      
      </ul>
      
    `;

  const user = JSON.parse(localStorage.getItem('user'));

  const h1_move = container.querySelector('.welcome');
  h1_move.style.transform = 'translateY(60px)';
  h1_move.style.opacity = '0';
  setTimeout(() => {
    h1_move.style.opacity = '1';
    h1_move.style.transition = 'opacity 1.8s ease, transform 1s ease';
    h1_move.style.transform = 'translateY(0)';
  }, 100);

  const namemessage = container.querySelector('#name-message');
  console.log(user);

  namemessage.textContent = `Let's do some introspection ${user.username}.`;
}
