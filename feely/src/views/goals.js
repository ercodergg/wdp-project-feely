import backIcon from '../pngicons/back.png';
import workIcon from '../pngicons/work.png';
import tickIcon from '../pngicons/tick.png';    
import { navigate } from '../main.js';

export function renderGoals(container) {
  container.innerHTML = `
    <div class="nav-buttons">
        <button class="button-home" id="back" data-view="home">
          <img data-view="home" class="icon-home" src="${backIcon}" />
          <p>Back</p>
        </button>
        <h1 class="welcome">Goals</h1> 
    </div>
    <input id="newgoal" type="text" placeholder="Achieve..." />
      <button class="button-home" id="add">
        <p>Add new goal +</p>
      </button>
      <ul class="question-list" id="goals"></ul>
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

  // Referencias a elementos
  const goalsList = container.querySelector('#goals');
  const input = container.querySelector('#newgoal');
  const addBtn = container.querySelector('#add');
  const user = JSON.parse(localStorage.getItem('user'));
  const email = user?.email;

function renderGoal(goal) {
  const exists = goalsList.querySelector(`[data-goal-id="${goal.id}"]`);
  if (exists) return;

  const li = document.createElement('li');
  li.dataset.goalId = goal.id;
  li.className = 'goal';

  li.innerHTML = `
    <button class="button-home goal-toggle" data-goal-toggle="${goal.id}">
      <img class="icon-home" src="${goal.completed ? tickIcon : workIcon}" data-goal-icon="${goal.id}" />
    </button>
    <p class="text-block">${goal.text}</p>
    <button class="button-home" data-goal-delete="${goal.id}">Delete</button>
  `;

  goalsList.appendChild(li);

  // Mostrar también en consola
  console.log("Goal renderizado en pantalla:", goal);
}

goalsList.addEventListener('click', (e) => {
    const toggleId = e.target.closest('[data-goal-toggle]')?.getAttribute('data-goal-toggle');
    if (!toggleId) return;
  
    // Buscar icono
    const icon = goalsList.querySelector(`[data-goal-icon="${toggleId}"]`);
    const isTick = icon.src.includes(tickIcon);
  
    // Alternar icono
    icon.src = isTick ? workIcon : tickIcon;
  
    // Actualizar en servidor
    const completed = !isTick;
    fetch(`https://wdp-project-feely.onrender.com/goals/${encodeURIComponent(email)}/${encodeURIComponent(toggleId)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    })
      .then(res => res.json())
      .then(payload => {
        console.log('Goal actualizado:', payload);
      })
      .catch(err => console.error('Error actualizando goal:', err));
  });
  

  // Cargar goals desde el servidor
  function loadGoalsForUser(email) {
    return fetch(`https://wdp-project-feely.onrender.com/goals/${encodeURIComponent(email)}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load goals');
        return res.json();
      })
      .then(goals => {
        console.log("Goals recibidos del servidor:", goals);
        goalsList.innerHTML = '';
        (Array.isArray(goals) ? goals : []).forEach(renderGoal);
        return goals;
      })
      .catch(err => {
        console.error('Error loading goals:', err);
        return [];
      });
  }
  
  // Generar ID incremental
  function generateGoalId(existingGoals) {
    const maxId = existingGoals.reduce((max, g) => Math.max(max, Number(g.id) || 0), 0);
    return maxId + 1;
  }

  // Añadir nuevo goal
  addBtn.addEventListener('click', async () => {
    const text = input.value.trim();
    if (!text) {
      console.log("Input vacío, no se añade nada");
      return;
    }

    try {
      const existing = await loadGoalsForUser(email);
      const id = generateGoalId(existing);
      const newGoal = { id, text, completed: false };

      console.log("Nuevo goal creado en frontend:", newGoal);

      const response = await fetch(`https://wdp-project-feely.onrender.com/goals/${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGoal)
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("Error al guardar goal en servidor:", errText);
        return;
      }

      const data = await response.json();
      console.log("Goal guardado correctamente en servidor:", data);

      // refrescar lista desde servidor
      await loadGoalsForUser(email);
      input.value = '';
    } catch (err) {
      console.error('Error de red al guardar goal:', err);
    }
  });

  // Toggle completion
  goalsList.addEventListener('change', (e) => {
    const toggleId = e.target.getAttribute('data-goal-toggle');
    if (!toggleId) return;
    const completed = e.target.checked;

    fetch(`https://wdp-project-feely.onrender.com/goals/${encodeURIComponent(email)}/${encodeURIComponent(toggleId)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    })
      .then(res => res.json())
      .then(payload => {
        console.log('Goal updated:', payload);
      })
      .catch(err => console.error('Error updating goal:', err));
  });

  // Delete goal
  goalsList.addEventListener('click', (e) => {
    const deleteId = e.target.getAttribute('data-goal-delete');
    if (!deleteId) return;

    fetch(`https://wdp-project-feely.onrender.com/goals/${encodeURIComponent(email)}/${encodeURIComponent(deleteId)}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(payload => {
        console.log('Goal deleted:', payload);
        const node = goalsList.querySelector(`[data-goal-id="${deleteId}"]`);
        if (node) node.remove();
      })
      .catch(err => console.error('Error deleting goal:', err));
  });

  // Inicializar lista al entrar en la vista
  loadGoalsForUser(email);
}
