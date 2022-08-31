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

module.exports = router;