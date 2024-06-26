"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require("express");
const app = express();
app.use(express.json());
/* ------------------------------------------------------- */
require("dotenv").config();
const PORT = process.env.PORT;
require("express-async-errors");

// continue from here...

const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- */
//* middlewares
app.use(express.json());

//*SessionCookies
app.use(require("cookie-session")({ secret: process.env.SECRET_KEY }));

//res.getModelList() //* QUERY

app.use(require("./src/middlewares/findSearchSortPage"));

/* ------------------------------------------------------- */
// routes
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PERSONNEL API",
  });
});

app.use("/departments", require("./src/routes/department.router"));

app.use("/personnels", require("./src/routes/personnel.router"));

/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()
