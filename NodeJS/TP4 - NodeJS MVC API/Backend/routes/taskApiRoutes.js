const express = require("express");
const router = express.Router();

// import le controller
const taskApiController = require("../controllers/taskApiController");

router.get("/tasks", taskApiController.getTasks);
router.get("/:id", taskApiController.getTask);
router.post("/", taskApiController.createTask);
router.put("/:id", taskApiController.updateTask);
router.delete("/:id", taskApiController.deleteTask);
router.delete("/", taskApiController.deleteTasks);

module.exports = router;
