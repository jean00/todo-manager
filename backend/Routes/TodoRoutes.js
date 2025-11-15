const express = require("express");
const router = express.Router();
const todoController = require("./../Controllers/TodoController");
const validate = require("../middleware/validate");
const {
  createTodoSchema,
  updateTodoSchema,
  getTodosByQuerySchema,
  deleteTodoSchema,
} = require("../validators/todoValidators");

router.post("/", validate(createTodoSchema), todoController.createTodo);
router.get("/", validate(getTodosByQuerySchema), todoController.getTodos);
router.patch("/:id", validate(updateTodoSchema), todoController.updateTodo);
router.delete("/:id", validate(deleteTodoSchema), todoController.deleteTodo);

module.exports = router;
