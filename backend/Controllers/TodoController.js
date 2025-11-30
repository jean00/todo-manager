const Todo = require("../Models/TodoModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.createTodo = catchAsync(async (req, res, next) => {
  const { title, description, backgroundColor, isPinned, dueDate } = req.body;

  if (!title || title.trim() === "") {
    return next(new AppError("Title is required", 400));
  }

  const todoData = {
    title,
    description,
    backgroundColor,
    isPinned,
    dueDate,
  };

  // Add userId only if user is authenticated
  if (req.user) {
    todoData.userId = req.user._id;
  }

  const newTodo = await Todo.create(todoData);

  res.status(201).json({ status: "success", todo: newTodo });
});

exports.getTodos = catchAsync(async (req, res, next) => {
  const { q } = req.query;
  let query = {};

  // Filter by userId if user is authenticated
  if (req.user) {
    query.userId = req.user._id;
  } else {
    // For guest users, only return todos without userId (shouldn't happen in practice)
    // Since guest todos are stored in localStorage, return empty array
    return res.status(200).json({ status: "success", todos: [] });
  }

  // Add search filter if query provided
  if (q) {
    const regex = new RegExp(q, "i");
    query.$or = [{ title: regex }, { description: regex }];
  }

  const todos = await Todo.find(query);

  res.status(200).json({ status: "success", todos });
});

exports.updateTodo = catchAsync(async (req, res, next) => {
  const query = { _id: req.params.id };

  // Ensure user can only update their own todos
  if (req.user) {
    query.userId = req.user._id;
  }

  const todo = await Todo.findOneAndUpdate(query, req.body, {
    new: true,
    runValidators: true,
  });

  if (!todo) {
    return next(
      new AppError(
        "No todo found with that ID or you don't have permission",
        404
      )
    );
  }

  res.status(200).json({ status: "success", todo });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  const query = { _id: req.params.id };

  // Ensure user can only delete their own todos
  if (req.user) {
    query.userId = req.user._id;
  }

  const todo = await Todo.findOneAndDelete(query);

  if (!todo) {
    return next(
      new AppError(
        "No todo found with that ID or you don't have permission",
        404
      )
    );
  }

  res.status(204).json({ status: "success", data: null });
});
