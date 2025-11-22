import { navigate } from '../main.js';

export function renderLogin(container) {
  container.innerHTML = `
    <h1 class="welcome">Login</h1>
    <form id="LoginForm">
      <input id="login-username" type="text" placeholder="Username" />
      <input id="login-password" type="password" placeholder="Password" />
      <section class="buttons">
        <button type="submit">Enter</button>
        <button type="reset">Clear</button>
      </section>
    </form>

    <section class="error-overlay" aria-hidden="true"></section>
    <section class="error-popup" role="dialog" aria-modal="true" aria-live="polite">
      <p class="error" id="login-username-error"></p>
      <p class="error" id="login-pass-error"></p>
      <button id="close-error" type="button">Close</button>
    </section>
  `;

  // Animación suave
  const h1_move = container.querySelector('.welcome');
  h1_move.style.transform = 'translateY(60px)';
  h1_move.style.opacity = '0';
  setTimeout(() => {
    h1_move.style.opacity = '1';
    h1_move.style.transition = 'opacity 1.8s ease, transform 1s ease';
    h1_move.style.transform = 'translateY(0)';
  }, 100);

  const form = container.querySelector('#LoginForm');
  const errorPopup = container.querySelector('.error-popup');
  const errorOverlay = container.querySelector('.error-overlay');
  const closeErrorButton = container.querySelector('#close-error');

  hideErrors(errorPopup, errorOverlay);

  form.addEventListener('submit', (event) => submitLogin(event, container));

  form.addEventListener('reset', () => {
    clearErrorMessages(container);
    hideErrors(errorPopup, errorOverlay);
  });

  closeErrorButton.addEventListener('click', () => {
    hideErrors(errorPopup, errorOverlay);
    clearErrorMessages(container);
  });

  errorOverlay.addEventListener('click', () => {
    hideErrors(errorPopup, errorOverlay);
  });
}

function submitLogin(event, container) {
  event.preventDefault();

  const username = container.querySelector('#login-username').value.trim();
  const password = container.querySelector('#login-password').value.trim();

  const usernameError = container.querySelector('#login-username-error');
  const passError = container.querySelector('#login-pass-error');
  const errorPopup = container.querySelector('.error-popup');
  const errorOverlay = container.querySelector('.error-overlay');

  clearErrorMessages(container);

  let valid = true;

  if (!username) {
    usernameError.textContent = 'Username cannot be empty.';
    valid = false;
  }

  if (!password) {
    passError.textContent = 'Password cannot be empty.';
    valid = false;
  }

  if (!valid) {
    showErrors(errorPopup, errorOverlay);
    return;
  }

  hideErrors(errorPopup, errorOverlay);

  fetch('http://localhost:3000/user')
    .then(res => res.json())
    .then(users => {
      const foundUser = users.find(u => u.username === username && u.password === password);
      if (foundUser) {
        localStorage.setItem('user', JSON.stringify(foundUser));
        console.log('Login correcto:', foundUser);

        const footer = document.querySelector('#footer');
        if (footer) {
          const noregistered_buttons = footer.querySelectorAll('.noregistered-buttons');
          const registered_buttons = footer.querySelectorAll('.registered-buttons');

          registered_buttons.forEach(btn => btn.style.display = "flex");
          noregistered_buttons.forEach(btn => btn.style.display = "none");
        }

        navigate('home');
        renderFooter();
      } else {
        passError.textContent = 'Usuario o contraseña incorrectos';
        showErrors(errorPopup, errorOverlay);
      }
    })
    .catch(err => {
      passError.textContent = 'Error al obtener usuarios: ' + err.message;
      showErrors(errorPopup, errorOverlay);
    });
}

/* Helpers */
function showErrors(errorPopup, errorOverlay) {
  errorPopup.classList.add('visible');
  errorOverlay.classList.add('visible');
}

function hideErrors(errorPopup, errorOverlay) {
  errorPopup.classList.remove('visible');
  errorOverlay.classList.remove('visible');
}

function clearErrorMessages(container) {
  const errorMessages = container.querySelectorAll('.error');
  errorMessages.forEach(el => (el.textContent = ''));
}
