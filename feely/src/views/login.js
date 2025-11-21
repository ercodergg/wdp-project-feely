import { navigate } from '../main.js';


export function renderLogin(container) {
  container.innerHTML = `
    <h1 class="welcome">Login</h1>
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
  const h1_move = container.querySelector('.welcome');
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
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    })
    .catch(err => {
      console.error('Error al obtener usuarios:', err);
    });
}
