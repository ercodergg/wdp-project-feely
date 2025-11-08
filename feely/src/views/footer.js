import homeIcon from '../pngicons/home.png'
import loginIcon from '../pngicons/login.png'

import registerIcon from '../pngicons/register.png'

export function renderFooter() {
  return `
      <!-- Menú de botones -->
      <nav class="nav-buttons">
        <button data-view="home">
        <img class="icon-home" src="${homeIcon}"/>
        <b>Home</b>
        </button>
        <button data-view="login">
        <img class="icon-home" src="${loginIcon}"/>
        <b>Login</b>
        </button>
        <button data-view="register">
        <img class="icon-home" src="${registerIcon}"/>
        <b>Register</b>
        </button>
      </nav>
  `;
}
