const express = require('express');
const router = express.Router();
const todoController = require('./../Controllers/TodoController');

router.post("/", todoController.createTodo);
router.get("/", todoController.getTodos);
router.patch("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
