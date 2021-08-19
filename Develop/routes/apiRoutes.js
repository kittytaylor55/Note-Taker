// LOAD DATA
const path = require('path');
const notesDB = require('../db/db.json');
const fs = require('fs')
var dataBase = []

// ROUTING
module.exports = (app) => {
     // API GET Requests
     app.get('/api/notes', (req, res) => {
        const allNotes = fs.readFileSync((path.join(__dirname, './db/db.json')), 'utf8');
  
        res.send(allNotes);
      });


    app.post('/api/notes', (req,res) => {
        let newNote = req.body;
    newNote.id = createId();

    let notesArr = JSON.parse(fs.readFileSync((path.join(__dirname, '../db/db.json')), 'utf8'));
    notesArr.push(newNote);

    fs.writeFile((path.join(__dirname, '../db/db.json')), JSON.stringify(notesArr, null, 2), (err) => {err? console.error(err) : 
        console.log("Successfully wrote db.json")});
    res.json(newNote);

  });
  function createId() {
    const uniqueId = uuidv4();
    return uniqueId;
  }


}

    // Empty out the arrays of data
    app.delete('/api/notes/:id', (req, res) => {
        const deleteID = req.params.id;
        let notesArr = JSON.parse(fs.readFileSync((path.join(__dirname, '../db/db.json')), 'utf8'));
    
        let deleteNote = notesArr.find((note) => note.id === deleteID);
        let position = notesArr.indexOf(deleteNote);
        notesArr.splice(position, 1);
    
        fs.writeFile((path.join(__dirname, '../db/db.json')), JSON.stringify(notesArr, null, 2), (err) => {err? console.error(err) : 
            console.log("Successfully wrote db.json")});
    
        res.json({ ok: true });
      });
