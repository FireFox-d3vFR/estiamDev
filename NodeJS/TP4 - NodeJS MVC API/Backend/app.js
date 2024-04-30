const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userApiRoute = require("./routes/userApiRoutes");
const taskApiRoute = require("./routes/taskApiRoutes");

const port = 8090;

// Chargement du fichier de configuration
dotenv.config();

// Récupérer l'application express
const app = express();

// Supprimer le message DeprecationWarning
mongoose.set("strictQuery", true);

// Connexion à la base de donnée (MongoDB)
mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB a réussie"))
  .catch((error) => console.log("Connexion à MongoDB a échouée" + error));

// Parse pour les formulaires
app.use(bodyParser.urlencoded({ extended: false }));

// Parse pour le json
app.use(bodyParser.json());

// Indiquer l'url de départ des routes pour userApiRoute
app.use("/api/user", userApiRoute);

// Indiquer l'url de départ des routes pour taskApiRoute
app.use("/api/task", taskApiRoute);

// Lancer le serveur express
app.listen(port, () => {
  console.log(`Le serveur est démarré sur le port ${port}`);
});
