import { computed, ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import type { Todo } from "@/types/todo";
import { supabase } from "@/lib/supabaseClient";
import { useUserStore } from "./user";
import { parseTodos } from "@/utils/parseTodos";

export const useTodosStore = defineStore("todos", () => {
  const { user } = storeToRefs(useUserStore());

  const todoToEdit = ref<Todo | null>(null);
  const todos = ref<Todo[]>([]);
  const showCompleted = ref(false);

  const uncompletedTodos = computed(() => todos.value.filter((todo) => !todo.completed));

  async function fetchTodos() {
    if (!user.value) return;

    const { data } = await supabase.from("todos").select("*").eq("user_id", user.value.id);

    todos.value = parseTodos(data ?? []);
  }

  async function addTodo(newTodo: Pick<Todo, "title" | "dueDate">) {
    if (!user.value) return;

    await supabase.from("todos").insert({
      title: newTodo.title,
      ...(newTodo.dueDate && { due_date: newTodo.dueDate }),
      user_id: user.value.id,
    });

    await fetchTodos();
  }

  async function updateTodo(id: string, data: Pick<Todo, "title" | "dueDate">) {
    const todo = todos.value.find((todo) => todo.id === id);

    if (!todo || !user.value) return;

    await supabase
      .from("todos")
      .update({
        title: data.title,
        ...(data.dueDate && { due_date: data.dueDate }),
      })
      .eq("id", id)
      .eq("user_id", user.value.id);

    await fetchTodos();
  }

  async function removeTodo(id: string) {
    const todo = todos.value.find((todo) => todo.id === id);

    if (!todo || !user.value) return;

    await supabase.from("todos").delete().eq("id", id).eq("user_id", user.value.id);

    await fetchTodos();
  }

  async function toggleTodo(id: string) {
    const todo = todos.value.find((todo) => todo.id === id);

    if (!todo || !user.value) return;

    await supabase
      .from("todos")
      .update({ completed: !todo.completed })
      .eq("id", id)
      .eq("user_id", user.value.id);

    await fetchTodos();
  }

  return {
    todoToEdit,
    todos,
    uncompletedTodos,
    fetchTodos,
    addTodo,
    updateTodo,
    removeTodo,
    toggleTodo,
    showCompleted,
  };
});
