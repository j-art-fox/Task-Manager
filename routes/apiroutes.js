//DEPENDENCIES
const uuid = require('uuid');
const fs = require('fs');
const router = require('express').Router();

//routes to render information from the Database
router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', "utf8", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

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
        })
    })
})

router.delete('/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let id = req.params.id;
        let dataBase = JSON.parse(data);
        const filteredDataBase = dataBase.filter(note => note.id !== id);
        fs.writeFile('./db/db.json', JSON.stringify(filteredDataBase, null, 2), (err) =>{
            if (err) throw err;
            res.json(filteredDataBase);
        })
    })
})

module.exports = router;