import homeIcon from '../pngicons/home.png'
import loginIcon from '../pngicons/login.png'

import registerIcon from '../pngicons/register.png'

export function renderFooter() {
  return `
      <!-- Menú de botones -->
      <nav class="nav-buttons">
        <button data-view="home">
        <img data-view="home" class="icon-home" src="${homeIcon}"/>
        <b data-view="home">Home</b>
        </button>
        <button data-view="login">
        <img data-view="login" class="icon-home" src="${loginIcon}"/>
        <b data-view="login">Login</b>
        </button>
        <button data-view="register">
        <img data-view="register" class="icon-home" src="${registerIcon}"/>
        <bdata-view="register" >Register</b>
        </button>
      </nav>
  `;
}
