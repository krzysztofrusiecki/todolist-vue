<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useTodosStore } from "@/stores/todos";
import TodoList from "@/components/TodoList.vue";
import dayjs from "dayjs";
import ListLayout from "@/components/ListLayout.vue";

const { uncompletedTodos, todos, showCompleted } = storeToRefs(useTodosStore());

const todayTodos = computed(() => {
  const todosToFilter = showCompleted.value ? todos.value : uncompletedTodos.value;

  return todosToFilter.filter((todo) => {
    return dayjs(todo.dueDate).isSame(dayjs(), "day");
  });
});
</script>

<template>
  <ListLayout>
    <TodoList :todos="todayTodos" />
  </ListLayout>
</template>
