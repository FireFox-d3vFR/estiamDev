const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 8090;

const handleMethods = require("./handleMethods.js");

// Parse pour le json
app.use(bodyParser.json());

app.get("/", (req, res) => {
    console.log("GET /");
    res.send("Welcome");
});

// Route du GET ALL
app.get("/todos", (req, res) => {
  console.log("GET ALL");
  handleMethods.handleGetAll(req, res);
});

// Route du GET
app.get("/todos/:id", (req, res) => {
  console.log(`GET ONE`);
  handleMethods.handleGetOne(req, res);
});

// Route du POST
app.post("/todos", (req, res) => {
  console.log("POST");
  handleMethods.handlePost(req, res);
});

// Route du PUT
app.put("/todos/:id", (req, res) => {
  console.log("PUT");
  handleMethods.handlePut(req, res);
});

// Route du DELETE
app.delete("/todos/:id", (req, res) => {
  console.log("DELETE");
  handleMethods.handleDelete(req, res);
});

// Si la route n'existe pas
app.use((req, res) => {
  res.status(404);
  res.send("Page introuvable");
});

app.listen(port, () => {
  console.log(`Le serveur est démarré sur le port ${port}`);
});
