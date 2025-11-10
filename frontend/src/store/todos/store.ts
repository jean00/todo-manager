import { create } from "zustand";

declare interface TodosInitialState {
  todos: {
    _id: string;
    title: string;
    description: string;
  }[];
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
