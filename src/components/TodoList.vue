<script setup lang="ts">
import { defineProps } from "vue";
import type { Todo } from "@/types/todo";
import TodoItem from "./TodoItem.vue";

const { todos } = defineProps<{
  todos: Todo[];
}>();
</script>

<template>
  <ul>
    <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
  </ul>
</template>
