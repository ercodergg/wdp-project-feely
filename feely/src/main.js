import './style.css';
import { renderHome } from './views/home.js';
import { renderLogin } from './views/login.js';
import { renderRegister } from './views/register.js';
import { renderProfile } from './views/profile.js';
import { renderFooter } from './views/footer.js';

const app = document.querySelector('#app');
const footer = document.querySelector('#footer');

// variable global accesible en navigate
let user = null;

document.addEventListener('DOMContentLoaded', () => {
  footer.innerHTML = renderFooter();
  const isDayMode = isDayTime();
  setTheme(isDayMode);

  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    user = JSON.parse(storedUser);
  }

  if (user && user.username) {
    navigate('home');
  } else {
    navigate('login');
  }
});

function setTheme(isDay) {
  const body = document.body;
  body.classList.remove('day', 'night');
  body.classList.add(isDay ? 'day' : 'night');
}

function isDayTime() {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 7 && hour < 17;
}

export function navigate(view) {
  app.innerHTML = '';

  switch (view) {
    case 'home':
      renderHome(app);
      break;
    case 'login':
      renderLogin(app);
      break;
    case 'register':
      renderRegister(app);
      break;
    case 'profile':
      renderProfile(app, user);   // ahora sí existe
      break;
    default:
      renderHome(app);
  }
}

document.body.addEventListener('click', (e) => {
  if (e.target.dataset.view) {
    navigate(e.target.dataset.view);
  }
});
