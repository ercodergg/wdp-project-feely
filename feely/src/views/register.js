export function renderRegister(container) {
  container.innerHTML = `
    <form>
    <h2>Register</h2>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <section class="buttons">
        <button type="submit">Enter</button>
        <button type="reset">Clear</button>
        </section>
      </form>
    `
}
