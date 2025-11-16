import express from 'express';
import fs from 'fs';
import cors from 'cors';

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

app.listen(3000, () => {
  console.log('Servidor backend en http://localhost:3000');
});
