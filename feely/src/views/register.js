export function renderRegister(container) {
  container.innerHTML = `
   <h1 id="welcome">Register</h1>
    <form>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <section class="buttons">
        <button type="submit">Enter</button>
        <button type="reset">Clear</button>
        </section>
      </form>
    `

    const h1_move = container.querySelector('#welcome');
    h1_move.style.transform = 'translateY(60px)'
    h1_move.style.opacity = '0'
    setTimeout(() => {
      h1_move.style.opacity = '1'
      h1_move.style.transition = 'opacity 1.8s ease,transform 1s ease'
      h1_move.style.transform = 'translateY(0)'
    }, 100)
}
