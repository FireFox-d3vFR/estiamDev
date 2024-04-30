const User = require("../models/user");

// récupérer la liste des users
module.exports.getUsers = async (query) => {
  try {
    var users = await User.find(query);
    return users;
  } catch (e) {
    throw Error(
      `Erreur lors de l'interrogation de tous les utilisateurs : ${e.message}`
    );
  }
};

// récupérer un user suivant son id
module.exports.getUser = async (query) => {
  try {
    var user = await User.findOne(query).populate("tasks");
    return user;
  } catch (e) {
    throw Error(
      `Erreur lors de l'interrogation d'un utilisateur : ${e.message}`
    );
  }
};

// créer un user
module.exports.createUser = async (user) => {
  try {
    return await user.save();
  } catch (e) {
    throw Error(
      `Erreur lors de l'enregistrement de l'utilisateur : ${e.message}`
    );
  }
};

// mettre à jour un user
module.exports.updateUser = async (query, user) => {
  try {
    return await User.updateOne(query, user);
  } catch (e) {
    throw Error(
      `Erreur lors de la mise à jour de l'utilisateur : ${e.message}`
    );
  }
};

// supprimer un user
module.exports.deleteUser = async (query) => {
  try {
    return await User.deleteOne(query);
  } catch (e) {
    throw Error(
      `Erreur lors de la suppression de l'utilisateur : ${e.message}`
    );
  }
};

// supprimer la liste de users
module.exports.deleteUsers = async (query) => {
  try {
    return await User.deleteMany(query);
  } catch (e) {
    throw Error(
      `Erreur lors de la suppression de tous les utilisateurs : ${e.message}`
    );
  }
};
