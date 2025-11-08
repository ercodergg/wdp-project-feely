export function renderLogin(container) {
  container.innerHTML = `
    <form>
    <h2>Login</h2>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <section class="buttons">
        <button type="submit">Enter</button>
        <button type="reset">Clear</button>
        </section>
      </form>
    `
}
