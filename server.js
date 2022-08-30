// Step 1: Set up Dependencies
const express = require("express");
const fs = require('fs');
const path = require("path");
let data;

//Step 3 Set up the server.
const app = express();
const PORT = process.env.PORT || 3001
// these are middleware data parsing methods from the client. express.json is for post requests
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Step 4: Set up the static Middleware.
app.use(express.static('public'))

//Step 5: Set up routes to render information from the Database
app.get('/api/notes', (req, res) => {
    data = JSON.parse(fs.readFileSync('./db/db.json',"utf8"))
    
    res.json(data)
})

// "crud" create(post) read(get) update (put) delete,
app.post('/api/notes', (req, res) => {
    data = JSON.parse(fs.readFileSync('./db/db.json', "utf8"))
    data.push(req.body)
    console.log(data)
    res.json(data)
    fs.writeFileSync('./db/db.json', JSON.stringify(data))
})

//Step 6: Set up routes and methods to be able to post information and save it to the Database

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname,"./public/notes.html"))
})


//Step 7: Set up method that allows a user to remove an entry in the Database.

//Part of Step 3
app.listen(PORT, () => console.log(`App listening on the following port: ${PORT}`))