import { navigate } from '../main.js';
import dbusers from '../db/user.json';
export function renderRegister(container) {
  container.innerHTML = `
   <h1 id="welcome">Register</h1>
    <form id="RegisterForm">
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <section class="buttons">
        <button type="submit">Enter</button>
        <button type="reset">Clear</button>
        </section>
      </form>
    `

  const h1_move = container.querySelector('#welcome');
  h1_move.style.transform = 'translateY(60px)'
  h1_move.style.opacity = '0'
  setTimeout(() => {
    h1_move.style.opacity = '1'
    h1_move.style.transition = 'opacity 1.8s ease,transform 1s ease'
    h1_move.style.transform = 'translateY(0)'
  }, 100)

  const form = container.querySelector('#RegisterForm');
  form.addEventListener('submit', submitRegister);
}

function submitRegister(event) {
  event.preventDefault();

  const username = document.querySelector('input[type="text"]').value;
  const email = document.querySelector('input[type="email"]').value;
  const password = document.querySelector('input[type="password"]').value;

  const newUser = { username, email, password };

  fetch('http://localhost:3000/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser)
  })
    .then(res => {
      if (!res.ok) {
        if (res.status === 409) throw new Error('Usuario ya existe');
        throw new Error('Error al registrar');
      }
      return res.json();
    })
    .then(data => {
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('Usuario registrado:', data.user);
      navigate('home');
    })
    .catch(err => alert(err.message));
}



