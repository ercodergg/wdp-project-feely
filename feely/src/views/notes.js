import backIcon from '../pngicons/back.png';
import tickIcon from '../pngicons/tick.png';
import { navigate } from '../main.js';

export function renderNotes(container) {
  container.innerHTML = `
    <div class="nav-buttons">
        <button class="button-home" id="back" data-view="home">
          <img data-view="home" class="icon-home" src="${backIcon}" />
          <p>Back</p>
        </button>
        <h1 class="welcome">Notes</h1> 
    </div>
    <textarea id="newnote" rows="5" cols="40" placeholder="Write a longer note..."></textarea>
      <button class="button-home" id="add-note">
        <p>Add new note +</p>
      </button>
      <ul class="note-list" id="notes"></ul>
  `;

  // Animación del título
  const h1_move = container.querySelector('.welcome');
  h1_move.style.transform = 'translateY(60px)';
  h1_move.style.opacity = '0';
  setTimeout(() => {
    h1_move.style.opacity = '1';
    h1_move.style.transition = 'opacity 1.8s ease, transform 1s ease';
    h1_move.style.transform = 'translateY(0)';
  }, 100);

  // Botón back
  const back = container.querySelector('#back');
  back.addEventListener('click', (event) => {
    event.preventDefault();
    navigate('home');
  });

  const notesList = container.querySelector('#notes');
  const input = container.querySelector('#newnote');
  const addBtn = container.querySelector('#add-note');
  const user = JSON.parse(localStorage.getItem('user'));
  const email = user?.email;

  function renderNote(note) {
    const exists = document.querySelector(`[data-note-id="${note.id}"]`);
    if (exists) return;

    const li = document.createElement('li');
    li.dataset.noteId = note.id;
    li.className = 'note-item';

    li.innerHTML = `
      <div class="note-row">
        <p class="note-text">${note.text}</p>
        <button class="button-home" data-note-delete="${note.id}">x</button>
      </div>
    `;

    notesList.appendChild(li);
  }

  async function loadNotesForUser(email) {
    try {
      const res = await fetch(`http://localhost:3000/notes/${encodeURIComponent(email)}`);
      if (!res.ok) throw new Error('Failed to load notes');
      const notes = await res.json();
      notesList.innerHTML = '';
      (Array.isArray(notes) ? notes : []).forEach(renderNote);
    } catch (err) {
      console.error('Error loading notes:', err);
    }
  }

  async function addNote(email) {
    const text = input.value.trim();
    if (!text) {
      alert('Write a note before adding.');
      return;
    }

    const newNote = { id: Date.now(), text };

    renderNote(newNote); // render optimista

    try {
      const res = await fetch(`http://localhost:3000/notes/${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote)
      });

      if (res.status !== 201) {
        throw new Error('Failed to save note');
      }
      const payload = await res.json();
      console.log('Note saved to server:', payload);
      input.value = '';
    } catch (err) {
      console.error('Error saving note:', err);
      alert('Could not save the note. Please try again.');
      const node = document.querySelector(`[data-note-id="${newNote.id}"]`);
      if (node) node.remove();
    }
  }

  addBtn.addEventListener('click', () => {
    if (!email) {
      alert('No user email found in localStorage.');
      return;
    }
    addNote(email);
  });

  // Enter + Shift para nueva línea, Enter solo para guardar
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addBtn.click();
    }
  });

  // inicializar
  if (email) loadNotesForUser(email);
}
