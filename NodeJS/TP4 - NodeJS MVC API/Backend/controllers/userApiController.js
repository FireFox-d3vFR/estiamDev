const userApiService = require("../services/userApiService");
const User = require("../models/user");
const crypto = require("crypto");

// récupérer la liste des users
module.exports.getUsers = async (req, res) => {
  try {
    var users = await userApiService.getUsers({});
    return res.status(200).json({
      status: 200,
      data: users,
      message: "Utilisateurs récupérés avec succès",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// récupérer un user suivant son id
module.exports.getUser = async (req, res) => {
  try {
    var user = await userApiService.getUser({ _id: req.params.id });
    return res.status(200).json({
      status: 200,
      data: user,
      message: "Récupération réussie de l'utilisateur",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// créer un user
module.exports.createUser = async (req, res) => {
  // crypter mdp
  req.body.password = crypto
    .createHmac("sha512", process.env.SECRET_KEY)
    .update(req.body.password)
    .digest("base64");

  try {
    let user = new User(req.body);
    user = await userApiService.createUser(user);
    return res.status(201).json({
      status: 201,
      data: user,
      message: "Sauvegarde réussie de l'utilisateur",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// update un user
module.exports.updateUser = async (req, res) => {
  // crypter mdp
  req.body.password = crypto
    .createHmac("sha512", process.env.SECRET_KEY)
    .update(req.body.password)
    .digest("base64");

  try {
    let user = await userApiService.updateUser(
      { _id: req.params.id },
      req.body
    );
    return res.status(201).json({
      status: 200,
      data: user,
      message: "Mise à jour de l'utilisateur réussie",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// supprimer un user
module.exports.deleteUser = async (req, res) => {
  try {
    await userApiService.deleteUser({ _id: req.params.id });
    return res
      .status(201)
      .json({ status: 200, message: "Suppression réussie de l'utilisateur" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// supprimer la liste users
module.exports.deleteUsers = async (req, res) => {
  try {
    await userApiService.deleteUsers({});
    return res.status(201).json({
      status: 200,
      message: "Suppression réussie de la liste d'utilisateurs",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
