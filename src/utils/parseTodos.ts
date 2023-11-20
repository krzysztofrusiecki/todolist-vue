import type { DBTodo, Todo } from "@/types/todo";

export const parseTodos = (todos: DBTodo[]): Todo[] => {
  return todos.map((todo) => ({
    id: todo.id,
    title: todo.title,
    completed: todo.completed,
    dueDate: todo.due_date,
    userId: todo.user_id,
    createdAt: todo.created_at,
    updatedAt: todo.updated_at,
  }));
};
