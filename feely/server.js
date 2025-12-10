import express from 'express';
import fs from 'fs';
import cors from 'cors';
import path from 'path';
const WEEKCHECK_DB = path.resolve('./src/db/weekcheck.json');
const GOALS_FILE = path.resolve('./src/db/goals.json');
const NOTES_FILE = path.resolve('./src/db/notes.json');
const QUOTES_FILE = path.resolve('./src/db/quotes.json');



const app = express();

// habilitar CORS para todas las peticiones desde cualquier origen
app.use(cors());
app.use(express.json());

app.get('/user', (req, res) => {
  const users = JSON.parse(fs.readFileSync('./src/db/user.json', 'utf-8'));
  res.json(users);
});

app.post('/user', (req, res) => {
  const newUser = req.body;
  const users = JSON.parse(fs.readFileSync('./src/db/user.json', 'utf-8'));

  const exists = users.some(u =>
    u.username === newUser.username || u.email === newUser.email
  );

  if (exists) {
    return res.status(409).json({ message: 'Usuario ya existe' });
  }

  users.push(newUser);
  fs.writeFileSync('./src/db/user.json', JSON.stringify(users, null, 2));
  res.json({ message: 'Usuario registrado', user: newUser });
});

function readQuotes() {
  if (!fs.existsSync(QUOTES_FILE)) return [];
  try {
    const data = fs.readFileSync(QUOTES_FILE, 'utf8');
    return JSON.parse(data); // aquí ya es un array
  } catch (err) {
    console.error("Error leyendo quotes.json:", err);
    return [];
  }
}


function writeQuotes(data) {
  fs.writeFileSync(QUOTES_FILE, JSON.stringify(data, null, 2));
}

function readNotes() {
  if (!fs.existsSync(NOTES_FILE)) return {};
  return JSON.parse(fs.readFileSync(NOTES_FILE, 'utf8'));
}

function writeNotes(data) {
  fs.writeFileSync(NOTES_FILE, JSON.stringify(data, null, 2));
}
// Helpers para leer/escribir
function readGoals() {
  if (!fs.existsSync(GOALS_FILE)) return {};
  return JSON.parse(fs.readFileSync(GOALS_FILE, 'utf8'));
}

function writeGoals(data) {
  fs.writeFileSync(GOALS_FILE, JSON.stringify(data, null, 2));
}

function writeWeekcheck(data) {
  try {
    fs.writeFileSync(WEEKCHECK_DB, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error escribiendo weekcheck.json:", err);
  }
}

function readWeekcheck() {
  try {
    if (!fs.existsSync(WEEKCHECK_DB)) return {};
    const raw = fs.readFileSync(WEEKCHECK_DB, 'utf8');
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.error("Error leyendo weekcheck.json:", err);
    return {};
  }
}

// --- Rutas de weekcheck ---
app.get('/weekcheck', (req, res) => {
  const weekData = readWeekcheck();
  res.json(weekData);
});

app.get('/weekcheck/:email', (req, res) => {
  const { email } = req.params;
  const weekData = readWeekcheck();

  if (!weekData[email]) {
    return res.status(404).json({ message: 'No hay registros para este usuario' });
  }

  const records = weekData[email];

  // Calcular rango de la semana actual
  const now = new Date();
  const dayOfWeek = (now.getDay() + 6) % 7; // lunes=0
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);
  endOfWeek.setHours(0, 0, 0, 0);

  // Filtrar registros de la semana actual
  const currentWeekRecords = records.filter(d => {
    if (!d || !d.day) return false;
    const [yyyy, mm, dd] = String(d.day).split('-').map(Number);
    const dayDate = new Date(yyyy, (mm || 1) - 1, dd || 1);
    return dayDate >= startOfWeek && dayDate < endOfWeek;
  });

  // Si hay registros pero ninguno de la semana actual → borrar
  if (records.length > 0 && currentWeekRecords.length === 0) {
    delete weekData[email];
    writeWeekcheck(weekData);
    return res.status(404).json({ message: 'Registros eliminados por no pertenecer a la semana actual' });
  }

  res.json(records);
});


app.post('/weekcheck', (req, res) => {
  console.log("Nuevo check recibido:", req.body);
  const { email, day, energy, expectations, fulfillment } = req.body;

  if (!email || !day || energy == null || expectations == null || fulfillment == null) {
    return res.status(400).json({ message: 'Datos incompletos' });
  }

  const weekData = readWeekcheck();
  if (!weekData[email]) {
    weekData[email] = [];
  }

  // Buscar si ya existe un registro para ese día
  let existing = weekData[email].find(r => r.day === day);

  if (existing) {
    // Sobrescribir valores
    existing.energy = energy;
    existing.expectations = expectations;
    existing.fulfillment = fulfillment;
  } else {
    // Crear nuevo registro
    const newEntry = { day, energy, expectations, fulfillment };
    weekData[email].push(newEntry);

    // Mantener solo los últimos 7 registros
    if (weekData[email].length > 7) {
      weekData[email] = weekData[email].slice(-7);
    }
  }

  writeWeekcheck(weekData);

  res.json({ message: existing ? 'Check sobrescrito' : 'Check registrado', data: weekData[email] });
});


// NUEVA RUTA DELETE para borrar weekcheck de un usuario concreto
app.delete('/weekcheck/:email', (req, res) => {
  const { email } = req.params;
  const weekData = readWeekcheck();

  if (!weekData[email]) {
    return res.status(404).json({ message: 'No hay registros para este usuario' });
  }

  // Elimina solo los registros del usuario indicado
  delete weekData[email];
  writeWeekcheck(weekData);

  res.json({ message: `Registros de weekcheck eliminados para ${email}` });
});




// -- Rutas de goals --

app.get('/goals/:email', (req, res) => {
  const { email } = req.params;
  const goalsData = readGoals();
  console.log("Contenido actual de goals.json:", goalsData);

  if (!goalsData[email]) {
    goalsData[email] = [];
    writeGoals(goalsData);
  }

  res.json(goalsData[email]);
});

app.post('/goals/:email', (req, res) => {
  const { email } = req.params;
  const { id, text, completed } = req.body;
  const goalsData = readGoals();
  console.log("Antes de añadir:", goalsData);

  if (!goalsData[email]) {
    goalsData[email] = [];
  }

  const newGoal = { id, text, completed: !!completed };
  goalsData[email].push(newGoal);
  writeGoals(goalsData);

  console.log("Después de añadir:", goalsData);

  res.status(201).json({ message: 'Goal creado', goal: newGoal });
});


// PUT actualizar estado de un goal
app.put('/goals/:email/:id', (req, res) => {
  const { email, id } = req.params;
  const { text, completed } = req.body;
  const goalsData = readGoals();

  if (!goalsData[email]) {
    goalsData[email] = [];
  }

  let goal = goalsData[email].find(g => g.id == id);

  if (!goal) {
    goal = { id, text, completed: !!completed };
    goalsData[email].push(goal);
  } else {
    if (text !== undefined) goal.text = text;
    if (completed !== undefined) goal.completed = !!completed;
  }

  writeGoals(goalsData);

  res.json({ message: 'Goal actualizado o creado', goal });
});

app.delete('/goals/:email/:id', (req, res) => {
  const { email, id } = req.params;
  const goalsData = readGoals();

  if (!goalsData[email]) {
    return res.status(404).json({ message: 'Usuario no tenía goals' });
  }

  const index = goalsData[email].findIndex(g => g.id == id);
  if (index === -1) {
    return res.status(404).json({ message: 'Goal no encontrado' });
  }

  const deleted = goalsData[email].splice(index, 1)[0];
  writeGoals(goalsData);

  res.json({ message: 'Goal eliminado', goal: deleted });
});
// GET notas por usuario
app.get("/notes/:email", (req, res) => {
  const { email } = req.params;
  const notesData = readNotes();

  if (!notesData[email]) {
    notesData[email] = [];
    writeNotes(notesData);
  }

  res.json(notesData[email]);
});

// POST nueva nota
app.post("/notes/:email", (req, res) => {
  const { email } = req.params;
  const { id, text } = req.body;
  const notesData = readNotes();

  if (!notesData[email]) {
    notesData[email] = [];
  }

  const newNote = { id, text };
  notesData[email].push(newNote);
  writeNotes(notesData);

  res.status(201).json({ message: "Note creada", note: newNote });
});

// DELETE nota
app.delete("/notes/:email/:id", (req, res) => {
  const { email, id } = req.params;
  const notesData = readNotes();

  if (!notesData[email]) {
    return res.status(404).json({ message: 'Usuario no tenía notas' });
  }

  const index = notesData[email].findIndex(n => n.id == id);
  if (index === -1) {
    return res.status(404).json({ message: 'Nota no encontrada' });
  }

  const deleted = notesData[email].splice(index, 1)[0];
  writeNotes(notesData);

  res.json({ message: 'Nota eliminada', note: deleted });
});

// GET todas las quotes
app.get('/quotes', (req, res) => {
  const quotes = readQuotes();
  res.json(quotes);
});

app.get('/quotes/random', (req, res) => {
  const quotes = readQuotes();
  if (!Array.isArray(quotes) || quotes.length === 0) {
    return res.status(404).json({ message: 'No hay quotes disponibles' });
  }
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json(randomQuote);
});

// POST nueva quote
app.post('/quotes', (req, res) => {
  const { id, quote, author } = req.body;
  const quotes = readQuotes();

  const newQuote = { id, quote, author };
  quotes.push(newQuote);
  writeQuotes(quotes);

  res.status(201).json({ message: 'Quote creada', quote: newQuote });
});

// DELETE quote por id
app.delete('/quotes/:id', (req, res) => {
  const { id } = req.params;
  const quotes = readQuotes();

  const index = quotes.findIndex(q => q.id == id);
  if (index === -1) {
    return res.status(404).json({ message: 'Quote no encontrada' });
  }

  quotes.splice(index, 1);
  writeQuotes(quotes);

  res.json({ message: 'Quote eliminada' });
});

app.listen(3000, () => {
  console.log('Servidor backend en http://localhost:3000');
});
