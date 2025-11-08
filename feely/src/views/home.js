import levelIcon from '../pngicons/level.png'
import planIcon from '../pngicons/plan.png'
export function renderHome(container) {

  container.innerHTML = `

    <section class="buttons-home">
      <a data-view="level-now">
        <img class="icon-home" id="level" src="${levelIcon}"/>
      </a>
      <a data-view="week-plan">
        <img class="icon-home" id="plan" src="${planIcon}"/>
      </a>
    </section>
  `
}
