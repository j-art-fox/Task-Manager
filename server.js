// Step 1: Set up Dependencies
const express = require("express");

const apiroutes = require('./routes/apiroutes')
const htmlroutes = require('./routes/htmlroutes')

//Step 3 Set up the server.
const app = express();
const PORT = process.env.PORT || 3001

// these are middleware data parsing methods from the client. express.json is for post requests
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', apiroutes)
app.use('/', htmlroutes)

//Step 4: Set up the static Middleware.



// "crud" create(post) read(get) update (put) delete,


//Step 6: Set up routes and methods to be able to post information and save it to the Database




//Step 7: Set up method that allows a user to remove an entry in the Database.

// app.delete(`/api/notes/:id`, (req, res) => {
//     data = JSON.parse(fs.readFileSync('./db/db.json', "utf8",))
   
// })

//Part of Step 3
app.listen(PORT, () => console.log(`App listening on the following port: ${PORT}`))