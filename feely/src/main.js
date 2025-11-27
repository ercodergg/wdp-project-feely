import './style.css';
import { renderHome } from './views/home.js';
import { renderLogin } from './views/login.js';
import { renderRegister } from './views/register.js';
import { renderProfile } from './views/profile.js';
import { renderCheck } from './views/check.js';
import { renderSemanalBalance } from './views/semanal_balance.js';
const app = document.querySelector('#app');

// variable global accesible en navigate

document.addEventListener('DOMContentLoaded', () => {
  const isDayMode = isDayTime();
  setTheme(isDayMode);


  const storedUser = localStorage.getItem('user');
  let user = JSON.parse(storedUser);

  if (user) {
    navigate('home');
  }
  else {
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
    case 'check':
      renderCheck(app);
      break;
    case 'semanal_balance':
      renderSemanalBalance(app);
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
