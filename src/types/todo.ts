import type { Database } from "@/lib/database.types";

export type DBTodo = Database["public"]["Tables"]["todos"]["Row"];

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string | null;
};
