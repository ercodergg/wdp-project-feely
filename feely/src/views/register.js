import { navigate } from '../main.js';
import dbusers from '../db/user.json';

export function renderRegister(container) {
  container.innerHTML = `
    <h1 class="welcome">Register</h1>
    <form id="RegisterForm">
      <input id="reg-username" type="text" placeholder="Username" />
      <input id="reg-email" type="text" placeholder="Email" />
      <input id="reg-password" type="password" placeholder="Password" />
      <section class="buttons">
        <button type="submit">Enter</button>
        <button type="reset">Clear</button>
      </section>
    </form>

    <section class="error-overlay" aria-hidden="true"></section>
    <section class="error-popup" role="dialog" aria-modal="true" aria-live="polite">
      <p class="error" id="username-error"></p>
      <p class="error" id="email-error"></p>
      <p class="error" id="pass-error"></p>
      <button id="close-error" type="button">Close</button>
    </section>
  `;

  // Entry animation
  const h1_move = container.querySelector('.welcome');
  h1_move.style.transform = 'translateY(60px)';
  h1_move.style.opacity = '0';
  setTimeout(() => {
    h1_move.style.opacity = '1';
    h1_move.style.transition = 'opacity 1.8s ease, transform 1s ease';
    h1_move.style.transform = 'translateY(0)';
  }, 100);

  const form = container.querySelector('#RegisterForm');
  const errorPopup = container.querySelector('.error-popup');
  const errorOverlay = container.querySelector('.error-overlay');
  const closeErrorButton = container.querySelector('#close-error');

  // Ensure hidden initially
  hideErrors(errorPopup, errorOverlay);

  // Submit handler (scope container)
  form.addEventListener('submit', (event) => submitRegister(event, container));

  // Reset: clear messages + hide modal
  form.addEventListener('reset', () => {
    clearErrorMessages(container);
    hideErrors(errorPopup, errorOverlay);
  });

  // Close on button
  closeErrorButton.addEventListener('click', () => {
    hideErrors(errorPopup, errorOverlay);
    clearErrorMessages(container);
  });

  // Close when clicking overlay
  errorOverlay.addEventListener('click', () => {
    hideErrors(errorPopup, errorOverlay);
    // Do not clear messages here if you want user to still see why it failed after accidentally clicking overlay.
  });
}

function submitRegister(event, container) {
  event.preventDefault();

  const username = container.querySelector('#reg-username').value.trim();
  const email = container.querySelector('#reg-email').value.trim();
  const password = container.querySelector('#reg-password').value.trim();

  const usernameError = container.querySelector('#username-error');
  const emailError = container.querySelector('#email-error');
  const passError = container.querySelector('#pass-error');
  const errorPopup = container.querySelector('.error-popup');
  const errorOverlay = container.querySelector('.error-overlay');

  // Reset previous errors
  clearErrorMessages(container);

  let valid = true;

  // Username validation
  if (!username) {
    usernameError.textContent = 'Username cannot be empty.';
    valid = false;
  } else if (username.length < 3) {
    usernameError.textContent = 'Username must be at least 3 characters.';
    valid = false;
  }

  // Email validation (basic regex)
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!email) {
    emailError.textContent = 'Email cannot be empty.';
    valid = false;
  } else if (!emailRegex.test(email)) {
    emailError.textContent = 'Please enter a valid email address.';
    valid = false;
  }

  // Password validation
  if (!password) {
    passError.textContent = 'Password cannot be empty.';
    valid = false;
  } else if (password.length < 6) {
    passError.textContent = 'Password must be at least 6 characters.';
    valid = false;
  } else if (password.length > 20) {
    passError.textContent = 'Password must not exceed 20 characters.';
    valid = false;
  } else {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!strongRegex.test(password)) {
      passError.textContent = 'Password must include uppercase, lowercase, and a number.';
      valid = false;
    }
  }

  // If invalid, show modal and stop
  if (!valid) {
    showErrors(errorPopup, errorOverlay);
    return;
  }

  // If valid, hide modal and continue
  hideErrors(errorPopup, errorOverlay);

  const newUser = { username, email, password };

  fetch('http://localhost:3000/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser)
  })
    .then(res => {
      if (!res.ok) {
        if (res.status === 409) throw new Error('User already exists.');
        throw new Error('Error while registering.');
      }
      return res.json();
    })
    .then(data => {
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('User registered:', data.user);
      navigate('home');
      renderFooter();
    })
    .catch(err => {
      // Show backend errors in popup instead of alert
      passError.textContent = err.message;
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
