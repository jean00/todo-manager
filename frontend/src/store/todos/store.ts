import { create } from "zustand";
import type { Todo } from "../../types";

declare interface TodosInitialState {
  todos: Todo[];
}

declare interface TodosActions {
  setTodos: (todos: TodosInitialState["todos"]) => void;
}
export type TodosStore = TodosInitialState & TodosActions;

const todosInitialState: TodosInitialState = {
  todos: [],
};

const todosActions = (set: {
  (
    partial:
      | TodosStore
      | Partial<TodosStore>
      | ((state: TodosStore) => TodosStore | Partial<TodosStore>),
    replace?: false
  ): void;
  (
    state: TodosStore | ((state: TodosStore) => TodosStore),
    replace: true
  ): void;
}) => ({
  setTodos: (todos: TodosInitialState["todos"]) =>
    set(() => ({
      todos,
    })),
});

export const useTodosStore = create<TodosStore>((set) => ({
  ...todosInitialState,
  ...todosActions(set),
}));
