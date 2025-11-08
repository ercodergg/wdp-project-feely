export function renderProfile(container, user) {
  const { username, photo, twits } = user;

  container.innerHTML = `
    <h2>Perfil de Usuario</h2>
    <p>@${username}</p>

    <div class="twits"></div>

  `;

  const twitsContainer = container.querySelector(".twits");

  // Renderizar todos los twits
  twits.forEach(({ text, image }) => {
    const twitEl = document.createElement("section");
    twitEl.classList.add("twit");

    twitEl.innerHTML = `
      <div class="twit-user">
        <img src="${photo}" alt="${username}" class="user-photo" />
        <p>@${username}</p>
      </div>

      <p>${text}</p>

      <img src="${image}" alt="post image" class="twit-image" />
    `;

    twitsContainer.appendChild(twitEl);
  });
}
