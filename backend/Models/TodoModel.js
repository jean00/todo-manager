const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A todo must have a title"],
    },
    description: String,
    backgroundColor: String,
    isPinned: Boolean,
    dueDate: Date,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: false, // Optional to allow guest todos
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
