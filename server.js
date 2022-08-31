//Utilizes express to set up server, and sets it to the variable "app" so we can use it later in our middleware and to create a "crud" app.
const express = require("express");
const app = express();

//Creates new variable that requires express and new instances of router for both the api and html calls.
const apiroutes = require('./routes/apiroutes');
const htmlroutes = require('./routes/htmlroutes');

//Tells the app to listen for activity locally on port 3101 or through whatever port is determined by heroku.
const PORT = process.env.PORT || 3101;

//These are middleware data parsing methods from the client. express.json is for post requests
app.use(express.static('public'));

//Built in middleware for post/put requests for sending data in the form of an object to the serer that you are attempting to store in the req.body. 
//Express.urlencoded is a method that recognizes the incoming request object as a string/array
app.use(express.urlencoded({ extended: true }));
//Express.json recognizes incoming requests which are JSON objects
app.use(express.json());

//Tells the server to use the following routes with our application
app.use('/api', apiroutes);
app.use('/', htmlroutes);

//listens to activity coming through in the PORT variable.
app.listen(PORT, () => console.log(`App listening on the following port: ${PORT}`))