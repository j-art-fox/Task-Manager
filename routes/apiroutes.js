//Requires the NPM package "uuid" which helps to create a universal unique identification number/code for our delete method.
const uuid = require('uuid');
//Requires the file system npm package which allows us to read and write files.
const fs = require('fs');
// Variable assigned with a function that creates a new router object in an application to handle data requests.
const router = require('express').Router();

//Route that gets and renders objects from the database
router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', "utf8", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

//Route that first reads the objects in the database, reconstructs their format to include an id, then reassembles tge new data objects and saves them in the database,
router.post('/notes', (req, res) => {
    fs.readFile('./db/db.json', "utf8", (err, data) => {
        if (err) throw err;
        const notesPlusId = {
            title: req.body.title,
            text: req.body.text,
            id: uuid.v4()
        };
        const dataBase = JSON.parse(data);
        dataBase.push(notesPlusId);
        fs.writeFile('./db/db.json', JSON.stringify(dataBase, null, 2), (err) => {
            if (err) throw err;
            res.json(dataBase);
        });
    });
});

//Route that reads the id parameter and "filters/deletes" data objects with a coresponding ID. 
router.delete('/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let id = req.params.id;
        let dataBase = JSON.parse(data);
        const filteredDataBase = dataBase.filter(note => note.id !== id);
        fs.writeFile('./db/db.json', JSON.stringify(filteredDataBase, null, 2), (err) => {
            if (err) throw err;
            res.json(filteredDataBase);
        })
    })
})

module.exports = router;