import { navigate } from '../main.js';
import dbusers from '../db/user.json';

export function renderLogin(container) {
  container.innerHTML = `
    <h1 id="welcome">Login</h1>
      <form id="loginForm">
          <input id="username" type="text" placeholder="Username" required />
          <input id="password" type="password" placeholder="Password" required />
          <section class="buttons">
            <button type="submit">Enter</button>
            <button type="reset">Clear</button>
          </section>
      </form>
  `;

  // Animación suave
  const h1_move = container.querySelector('#welcome');
  h1_move.style.transform = 'translateY(60px)';
  h1_move.style.opacity = '0';
  setTimeout(() => {
    h1_move.style.opacity = '1';
    h1_move.style.transition = 'opacity 1.8s ease, transform 1s ease';
    h1_move.style.transform = 'translateY(0)';
  }, 100);

  // Vincular evento al formulario
  const form = container.querySelector('#loginForm');
  form.addEventListener('submit', submitLogin);
}

function submitLogin(event) {
  event.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const userData = { username, password };

  // Buscar en el JSON si existe un usuario con esos datos
  const foundUser = dbusers.find(
    u => u.username === userData.username && u.password === userData.password
  );

  if (foundUser) {
    // Guardar en localStorage
    localStorage.setItem('user', JSON.stringify(foundUser));
    console.log('Login correcto:', foundUser);
    navigate('home');
  } else {
    console.log('Usuario o contraseña incorrectos');
    alert('Usuario o contraseña incorrectos');
  }
}

