import homeIcon from '../pngicons/home.png'
import loginIcon from '../pngicons/login.png'
import levelIcon from '../pngicons/level.png';
import planIcon from '../pngicons/plan.png';

import registerIcon from '../pngicons/register.png'

export function renderFooter() {
  return `
      <!-- Menú de botones -->
      <nav class="nav-buttons">
        <button class="registered-buttons" data-view="home">
        <img data-view="home" class="icon-home" src="${homeIcon}"/>
        <b data-view="home">Home</b>
        </button>
        <button class="registered-buttons" data-view="check">
        <img data-view="check" class="icon-home" src="${levelIcon}"/>
        <b data-view="check">Check</b>
        </button>
        <button class="registered-buttons" data-view="semanal_balance">
        <img data-view="semanal_balance" class="icon-home" src="${planIcon}"/>
        <b data-view="semanal_balance">Semanal Balance</b>
        </button>
        <button  class="noregistered-buttons" data-view="login">
        <img data-view="login" class="icon-home" src="${loginIcon}"/>
        <b data-view="login">Login</b>
        </button>
        <button class="noregistered-buttons" data-view="register">
        <img data-view="register" class="icon-home" src="${registerIcon}"/>
        <bdata-view="register" >Register</b>
        </button>
      </nav>
  `;
}
