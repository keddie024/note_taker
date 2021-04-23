// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const noteList = require("./db/db.json");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Reads the note data that is currently stored.
app.get("/api/notes", (req, res) => {
    return res.json(JSON.parse(fs.readFileSync("./db/db.json")));
});

// Adds note data that the user creates.
app.post("/api/notes", (req, res) => {
    let note = req.body;

    noteList.push(note);
    note.id = noteList.indexOf(note);
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));

    res.json(note);
})

// Will bring users to the home page.
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

// Will bring users to the notes page.
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

// Will bring users to the home page if they type in a bad path.
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

// Creates the server and begins waiting for directions.
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));