export function renderSemanalBalance(container) {
    container.innerHTML = `
      <h1 class="welcome">Semanal Balance</h1>
      <p class="quote-container" id="name-message"></p>
    `;

    const user = JSON.parse(localStorage.getItem('user'));

    const h1_move = container.querySelector('.welcome');
    h1_move.style.transform = 'translateY(60px)';
    h1_move.style.opacity = '0';
    setTimeout(() => {
        h1_move.style.opacity = '1';
        h1_move.style.transition = 'opacity 1.8s ease, transform 1s ease';
        h1_move.style.transform = 'translateY(0)';
    }, 100);

    const namemessage = container.querySelector('#name-message');
    console.log(user);

    namemessage.textContent = `Let's do some introspection ${user.username}.`;
}
