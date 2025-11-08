import './style.css'
import { renderHome } from './views/home.js'
import { renderLogin } from './views/login.js'
import { renderRegister } from './views/register.js'
import { renderProfile } from './views/profile.js'
import { renderFooter } from './views/footer.js'

const app = document.querySelector('#app')
const footer = document.querySelector('#footer')


// Render header once
document.addEventListener('DOMContentLoaded', () => {
  footer.innerHTML = renderFooter()
  navigate('home')
  let isDayMode = true;
  setTheme(isDayMode)

})
function setTheme(isDay) {
  const body = document.body
  body.classList.remove('day', 'night')
  body.classList.add(isDay ? 'day' : 'night')
}

// Simple router
function navigate(view) {
  app.innerHTML = ''

  switch (view) {
    case 'home':
      renderHome(app)
      break
    case 'login':
      renderLogin(app)
      break
    case 'register':
      renderRegister(app)
      break
    case 'profile':
      renderProfile(app, user)
      break
    default:
      renderHome(app)
  }
}

// Navigation events delegados
document.body.addEventListener('click', (e) => {
  if (e.target.dataset.view) {
    navigate(e.target.dataset.view)
  }
})
