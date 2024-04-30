const taskApiService = require("../services/taskApiService");
const Task = require("../models/task");

// récupérer la liste des tasks
module.exports.getTasks = async (req, res) => {
  try {
    var tasks = await taskApiService.getTasks({});
    return res.status(200).json({
      status: 200,
      data: tasks,
      message: "Tâches récupérées avec succès",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// récupérer une task avec son id
module.exports.getTask = async (req, res) => {
  try {
    var task = await taskApiService.getTask({ _id: req.params.id });
    return res.status(200).json({
      status: 200,
      data: task,
      message: "Tâche récupérée avec succès",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// créer une task
module.exports.createTask = async (req, res) => {
  try {
    let task = new Task(req.body);
    task = await taskApiService.createTask(task);
    return res.status(201).json({
      status: 201,
      data: task,
      message: "Tâche sauvegardée avec succès",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// update une task
module.exports.updateTask = async (req, res) => {
  try {
    let task = await taskApiService.updateTask(
      { _id: req.params.id },
      req.body
    );
    return res.status(201).json({
      status: 200,
      data: task,
      message: "Mise à jour de la tâche réussie",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

// supprimer une task
module.exports.deleteTask = async (req, res) => {
  try {
    await taskApiService.deleteTask({ _id: req.params.id });
    return res
      .status(201)
      .json({ status: 200, message: "Suppression réussie de la tâche" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

module.exports.deleteTasks = async (req, res) => {
    try {
        await taskApiService.deleteTasks({});
        return res.status(201).json({
            status: 200,
            message: "Suppression réussie de la liste des tâches",
        });
    } catch(e) {
        return res.status(400).json({status: 400, message: e.message});
    }
}
