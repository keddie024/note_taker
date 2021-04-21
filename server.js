const express = require("express");
const path = require("path");
const fs = require("fs");
const noteList = require("./db/db.json");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get("/api/notes", (req, res) => {
    return res.json(JSON.parse(fs.readFileSync("./db/db.json")));
});

app.post("/api/notes", (req, res) => {
    const note = req.body;

    noteList.push(note);
    note.id = noteList.indexOf(note);
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));

    res.json(note);
})





app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));