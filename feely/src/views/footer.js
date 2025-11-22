import homeIcon from '../pngicons/home.png'
import loginIcon from '../pngicons/login.png'
import levelIcon from '../pngicons/level.png';
import planIcon from '../pngicons/plan.png';

import registerIcon from '../pngicons/register.png'

export function renderFooter() {
  return `
      <!-- Menú de botones -->
      <nav class="noregistered-buttons nav-buttons">
        <button data-view="login" >
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
