<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useTodosStore } from "@/stores/todos";
import TodoList from "@/components/TodoList.vue";
import dayjs from "dayjs";
import ListLayout from "@/components/ListLayout.vue";

const { uncompletedTodos, todos, showCompleted } = storeToRefs(useTodosStore());

const nextWeekTodos = computed(() => {
  const todosToFilter = showCompleted.value ? todos.value : uncompletedTodos.value;

  return todosToFilter.filter((todo) => {
    return (
      dayjs(todo.dueDate).isAfter(dayjs(), "day") &&
      dayjs(todo.dueDate).isBefore(dayjs().add(7, "day"), "day")
    );
  });
});
</script>

<template>
  <ListLayout>
    <TodoList :todos="nextWeekTodos" />
  </ListLayout>
</template>
