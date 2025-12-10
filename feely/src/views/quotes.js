import backIcon from '../pngicons/back.png';
import { navigate } from '../main.js';

export function renderQuotes(container) {
  container.innerHTML = `
    <div class="nav-buttons">
        <button class="button-home" id="back" data-view="home">
          <img data-view="home" class="icon-home" src="${backIcon}" />
          <p>Back</p>
        </button>
        <h1 class="welcome">Quotes</h1> 
    </div>
    <textarea id="newquote" rows="3" cols="40" placeholder="Write a new quote..."></textarea>
    <button class="button-home" id="add-quote">
      <p>Add new quote +</p>
    </button>
    <ul class="quote-list" id="quotes"></ul>
  `;
  // Botón back
  const back = container.querySelector('#back');
  back.addEventListener('click', (event) => {
    event.preventDefault();
    navigate('home');
  });

  const quotesList = container.querySelector('#quotes');
  const inputQuote = container.querySelector('#newquote');
  const addBtn = container.querySelector('#add-quote');
  const user = JSON.parse(localStorage.getItem('user'));
  const loggedUser = user.username || 'Anonymous';

  function renderQuote(quoteObj, index) {
    const id = quoteObj.id || index; // si no hay id, usa el índice
    const exists = document.querySelector(`[data-quote-id="${id}"]`);
    if (exists) return;

    const li = document.createElement('li');
    li.dataset.quoteId = id;
    li.className = 'quote-container';

    li.innerHTML = `
      <p class="quote-text">"${quoteObj.quote}"<br/> ${quoteObj.author}</p>
    `;

    quotesList.appendChild(li);
  }


  async function loadQuotes() {
    try {
      const res = await fetch(`https://wdp-project-feely.onrender.com/quotes`);
      if (!res.ok) throw new Error('Failed to load quotes');
      const quotes = await res.json();
      quotesList.innerHTML = '';
      (Array.isArray(quotes) ? quotes : quotes.default || [])
        .forEach((q, i) => renderQuote(q, i));
    } catch (err) {
      console.error('Error loading quotes:', err);
    }
  }


  async function addQuote() {
    const text = inputQuote.value.trim();
    if (!text) {
      alert('Write a quote before adding.');
      return;
    }

    const newQuote = { id: Date.now(), quote: text, author: loggedUser };
    renderQuote(newQuote);

    try {
      const res = await fetch(`https://wdp-project-feely.onrender.com/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newQuote)
      });

      if (res.status !== 201) throw new Error('Failed to save quote');
      await res.json();
      inputQuote.value = '';
      loadQuotes();
    } catch (err) {
      console.error('Error saving quote:', err);
    }
  }

  addBtn.addEventListener('click', () => {
    addQuote();
  });

  inputQuote.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addBtn.click();
    }
  });

  loadQuotes();
}
