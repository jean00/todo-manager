const express = require("express");
const router = express.Router();
const todoController = require("./../Controllers/TodoController");
const validate = require("../middleware/validate");
const { optionalAuth } = require("../middleware/auth");
const {
  createTodoSchema,
  updateTodoSchema,
  getTodosByQuerySchema,
  deleteTodoSchema,
} = require("../validators/todoValidators");

// Apply optional authentication to all todo routes
// This allows both authenticated and guest users to create todos
// But filters results by userId for authenticated users
router.use(optionalAuth);

router.post("/", validate(createTodoSchema), todoController.createTodo);
router.get("/", validate(getTodosByQuerySchema), todoController.getTodos);
router.patch("/:id", validate(updateTodoSchema), todoController.updateTodo);
router.delete("/:id", validate(deleteTodoSchema), todoController.deleteTodo);

module.exports = router;
