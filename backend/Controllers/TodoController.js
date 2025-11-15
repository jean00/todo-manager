const Todo = require("../Models/TodoModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

exports.createTodo = catchAsync(async (req, res, next) => {
  const { title, description, backgroundColor, isPinned, dueDate } = req.body;

  if (!title || title.trim() === "") {
    return next(new AppError("Title is required", 400));
  }

  const newTodo = await Todo.create({
    title,
    description,
    backgroundColor,
    isPinned,
    dueDate,
  });

  res.status(201).json({ status: "success", todo: newTodo });
});

exports.getTodos = catchAsync(async (req, res, next) => {
  const { q } = req.query;
  let todos;

  if (q) {
    const regex = new RegExp(q, "i");
    todos = await Todo.find({
      $or: [{ title: regex }, { description: regex }],
    });
  } else {
    todos = await Todo.find();
  }

  res.status(200).json({ status: "success", todos });
});

exports.updateTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!todo) {
    return next(new AppError("No todo found with that ID", 404));
  }

  res.status(200).json({ status: "success", todo });
});

exports.deleteTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);

  if (!todo) {
    return next(new AppError("No todo found with that ID", 404));
  }

  res.status(204).json({ status: "success", data: null });
});
