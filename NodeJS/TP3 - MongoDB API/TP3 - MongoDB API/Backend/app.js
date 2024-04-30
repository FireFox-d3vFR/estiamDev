const mongoose = require("mongoose");
const User = require("./models/user");

mongoose
  .connect(
    "mongodb+srv://firefox-d3vFR:ZVWIoUcs4O1hJgjK@cluster-nodejs.zqfhv6t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-NodeJS",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch(() => console.log("Connexion à MongoDB échouée"));

function createUser() {
  let user = new User({
    firstName: "Jonathan",
    lastName: "Maquenhem",
    email: "jonathan.maquenhem@test.com",
    password: "12345",
  });
  // Ajouter un objet
  user
    .save()
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}

// Récupérer tous les objets sous forme de tableau
function findAll() {
  User.find()
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}

// Récupérer un seul objet sous forme de tableau
function findOne() {
  User.findOne({ _id: "6616a1361cbeeea22a4284ea" })
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}

function updateOne() {
  // Met a jour un objet
  User.updateOne({ _id: "6616a1361cbeeea22a4284ea" }, { password: "1111" })
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}

function deleteOne() {
  User.deleteOne({ _id: "6616a130f7f1ce3f40e84d42" })
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}

function deleteMany() {
User.deleteMany({})
    .then(() => console.log("Données supprimées"))
    .catch((error) => console.log(error));
}
