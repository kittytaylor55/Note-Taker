// LOAD DATA
const path = require('path');
const notesDB = require('../db/db.json');
const fs = require('fs')
var dataBase = []

// ROUTING
module.exports = (app) => {
     // API GET Requests
    app.get('/api/notes', (req,res) =>  {
        fs.readFile('./db/db.json', (err,data) => {
            if (err) throw err
            dataBase = JSON.parse(data);
            res.json(dataBase)
        })
    })

    app.post('/api/notes', (req,res) => {
        dataBase.push(req.body)
        fs.writeFile('./db/db.json', JSON.stringify(dataBase), function (err)  {
            if (err) {
                return console.log(err)
            } else {
                console.log('Note Saved')
            }
            })
            res.json(req.body);
        });
}
app.post('/api/clear', (req, res) => {
    // Empty out the arrays of data
    tableData.length = 0;
    waitListData.length = 0;

    res.json({ ok: true });
  });

