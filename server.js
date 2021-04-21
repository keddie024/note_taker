const express = require ("express");
const path = require ("path");
const fs = require ("fs");
const noteList = require ("./db/db.json");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());







app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));