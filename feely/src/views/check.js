export function renderCheck(container) {
  container.innerHTML = `
    <button class="back-button"  data-view="home"> < Back</button>
    <h1 class="welcome">Check</h1> 
    <div class="quote-container">
<p class="quote-text" id="name-message"></p>
</div>
            <div class="left-column">
    
  </div>

    <ul class="question-list">
      <li>
      <h2>80%</h2>
        <div class="question-container">
          <button class="button-home" data-view="check">
            <img data-view="check" class="icon-home" " />
            <b data-view="check">Energy</b>
          </button>
        </div>
      </li>
            <li>
            <h2>80%</h2>
        <div class="question-container">
          <button class="button-home" data-view="check">
            <img data-view="check" class="icon-home" " />
            <b data-view="check">Optimism</b>
          </button>
        </div>
      </li>
      <li>
      <h2>80%</h2>
        <div class="question-container">
          <button class="button-home" data-view="goals">
            <img data-view="goals" class="icon-home" />
            <b data-view="goals">Fulfillment</b>
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
