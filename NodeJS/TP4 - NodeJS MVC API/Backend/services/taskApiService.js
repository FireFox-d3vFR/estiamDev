const Task = require("../models/task");
const User = require("../models/user");

// Récupérer la liste des tasks
module.exports.getTasks = async (query) => {
  try {
    var tasks = await Task.find(query);
    return tasks;
  } catch (e) {
    throw Error(
      `Erreur lors de l'interrogation de toutes les tâches : ${e.message}`
    );
  }
};

// Récupérer une task suivant son id
module.exports.getTask = async (query) => {
  try {
    var task = await Task.findOne(query).populate("user");
    return task;
  } catch (e) {
    throw Error(`Erreur lors de l'interrogation d'une tâches : ${e.message}`);
  }
};

// Créer une task
module.exports.createTask = async (task) => {
  try {
    var task = await task.save();
    console.log(task);
    await User.findByIdAndUpdate(
      { _id: task.user },
      { $push: { tasks: task_id } }
    );
    return task;
  } catch (e) {
    throw Error(`Erreur lors de l'enregistrement de la tâche : ${e.message}`);
  }
};

// Mettre à jour une task
module.exports.updateTask = async (query, task) => {
  try {
    return await Task.updateOne(query, task);
  } catch (e) {
    throw Error(`Erreur lors de la mise à jour de la tâche : ${e.message}`);
  }
};

// Supprimer une task
module.exports.deleteTask = async (query) => {
  try {
    return await Task.deleteOne(query);
  } catch (e) {
    throw Error(`Erreur lors de la suppression de la tâche : ${e.message}`);
  }
};

// Supprimer la liste des tâches
module.exports.deleteTasks = async (query) => {
  try {
    return await Task.deleteMany(query);
  } catch (e) {
    throw Error(
      `Erreur lors de la suppression de toutes les tâches : ${e.message}`
    );
  }
};
