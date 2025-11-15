const { z } = require("zod");

const createTodoSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .min(1, "Title cannot be empty")
      .max(200, "Title is too long"),
    description: z.string().max(2000, "Description is too long").optional(),
    backgroundColor: z
      .string()
      .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format")
      .optional(),
    isPinned: z.boolean().optional(),
    dueDate: z.string().datetime().or(z.date()).optional(),
  }),
});

const updateTodoSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, "Title cannot be empty")
      .max(200, "Title is too long")
      .optional(),
    description: z.string().max(2000, "Description is too long").optional(),
    backgroundColor: z
      .string()
      .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color format")
      .optional(),
    isPinned: z.boolean().optional(),
    dueDate: z.string().datetime().or(z.date()).optional(),
  }),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid todo ID"),
  }),
});

const getTodosByQuerySchema = z.object({
  query: z.object({
    q: z.string().max(100, "Search query is too long").optional(),
  }),
});

const deleteTodoSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid todo ID"),
  }),
});

module.exports = {
  createTodoSchema,
  updateTodoSchema,
  getTodosByQuerySchema,
  deleteTodoSchema,
};
