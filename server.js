// Step 1: Set up Dependencies
const express = require("express");
const fs = require('fs');
const path = require("path");
const util = require("util");

//Step 2: Handle asynchronous processes 

//Step 3 Set up the server.
const app = express();
const PORT = process.env.PORT || 3001
app.use(express.json())
app.use(express.urlencoded( {extended: true}))

//Step 4: Set up the static Middleware.
app.use (express.static('public'))


//Part of Step 3
app.listen(PORT, () => console.log(`App listening on the following port: ${PORT}`))