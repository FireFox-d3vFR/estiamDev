const http = require("http");
const handleMethode = require("./handleMethods");

const server = http.createServer((req, res) => {
    // Appel de la méthode handleMethods exporté
    handleMethode.handleMethods(req, res);
});

// Démarrer le serveur
server.listen(8090, () => {
    console.log("Serveur démarré sur le port 8090");
});
