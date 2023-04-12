const express = require('express');
const fs = require('fs');
const path = require('path');
const notes = require('./db/db.json');

const app = express();


const PORT  = process.env.PORT || 3001;

app.use(express.static('public'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/api/notes', (req, res) => {
  res.json(notes.slice(1));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

function createNote(body, newArr) {
  const newNote = body;
  if (!Array.isArray(newArr))
      newArr = [];  
  if (newArr.length === 0)
      newArr.push(0);
  body.id = newArr[0];
  newArr[0]++;
  newArr.push(newNote);
  fs.writeFileSync(
      path.join(__dirname, 'db\db.json'),
      JSON.stringify(newArr, null, 2)
  );
  return newNote;
}


app.post('/api/notes', (req, res) => {
  const newNote = createNote(req.body, notes);
  res.json(newNote);
  console.log(newNote)
}); 


app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);
