import './style.css';
import { renderHome } from './views/home.js';
import { renderLogin } from './views/login.js';
import { renderRegister } from './views/register.js';
import { renderProfile } from './views/profile.js';
import { renderCheck } from './views/check.js';
import { renderWeeklyBalance } from './views/weekly_balance.js';
import { renderGoals } from './views/goals.js';
import { renderNotes } from './views/notes.js';
import { renderQuotes } from './views/quotes.js';
const app = document.querySelector('#app');

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
    case 'weekly_balance':
      renderWeeklyBalance(app);
      break;
    case 'goals':
      renderGoals(app);
      break;
    case 'notes':
      renderNotes(app);
      break;
    case 'quotes':
      renderQuotes(app);
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
