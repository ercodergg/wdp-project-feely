import { navigate } from '../main.js';
import dbusers from '../db/user.json';

export function renderRegister(container) {
  container.innerHTML = `
    <h1 class="welcome">Register</h1>
    <form id="RegisterForm">
      <input type="text" placeholder="Username" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <section class="buttons">
        <button type="submit">Enter</button>
        <button type="reset">Clear</button>
        </section>
    </form>
        <p class="error" id="username-error"></p>
        <p class="error" id="email-error"></p>
        <p class="error" id="pass-error"></p>
  `;

  const h1_move = container.querySelector('.welcome');
  h1_move.style.transform = 'translateY(60px)';
  h1_move.style.opacity = '0';
  setTimeout(() => {
    h1_move.style.opacity = '1';
    h1_move.style.transition = 'opacity 1.8s ease,transform 1s ease';
    h1_move.style.transform = 'translateY(0)';
  }, 100);

  const form = container.querySelector('#RegisterForm');
  form.addEventListener('submit', submitRegister);
}

function submitRegister(event) {
  event.preventDefault();

  const username = document.querySelector('input[type="text"]').value.trim();
  const email = document.querySelector('input[type="email"]').value.trim();
  const password = document.querySelector('input[type="password"]').value.trim();

  // Error message elements
  const usernameError = document.getElementById('username-error');
  const emailError = document.getElementById('email-error');
  const passError = document.getElementById('pass-error');

  // Reset previous errors
  usernameError.textContent = '';
  emailError.textContent = '';
  passError.textContent = '';

  let valid = true;

  // ✅ Username validation
  if (!username) {
    usernameError.textContent = 'Username cannot be empty.';
    valid = false;
  }

  // ✅ Email validation (basic regex)
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!email) {
    emailError.textContent = 'Email cannot be empty.';
    valid = false;
  } else if (!emailRegex.test(email)) {
    emailError.textContent = 'Please enter a valid email address.';
    valid = false;
  }

  // ✅ Password validation
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
    // Check for complexity: at least one uppercase, one lowercase, one number
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!strongRegex.test(password)) {
      passError.textContent = 'Password must include uppercase, lowercase, and a number.';
      valid = false;
    }
  }

  // Stop if validation failed
  if (!valid) return;

  // ✅ If validation passes, continue with fetch
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
    })
    .catch(err => alert(err.message));
}
