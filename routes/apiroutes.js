//Step 5: Set up routes to render information from the Database
app.get('/api/notes', (req, res) => {
    data = JSON.parse(fs.readFileSync('./db/db.json',"utf8"))
    
    res.json(data)
})

app.post('/api/notes', (req, res) => {
    fs.readFileSync('./db/db.json', "utf8", (err, data) => {
        if (err) throw err;
        const notesPlusId = {
            title: req.body.title,
            text: req.body.text,
            id: uuid.v4()
        }
    const dataBase = JSON.parse(data)
    dataBase.push(notesPlusId)
    fs.writeFileSync('./db/db.json', JSON.stringify(dataBase))
})
})