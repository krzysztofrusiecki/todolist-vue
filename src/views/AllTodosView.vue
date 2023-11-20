<script setup lang="ts">
import { useTodosStore } from "@/stores/todos";
import { storeToRefs } from "pinia";
import TodoList from "@/components/TodoList.vue";
import dayjs from "dayjs";
import { computed } from "vue";
import ListLayout from "@/components/ListLayout.vue";

const { uncompletedTodos, todos, showCompleted } = storeToRefs(useTodosStore());

const sortedTodos = computed(() => {
  const todosToFilter = showCompleted.value ? todos.value : uncompletedTodos.value;

  return todosToFilter.sort((a, b) => {
    if (dayjs(a.dueDate).isBefore(dayjs(b.dueDate))) {
      return -1;
    } else if (dayjs(a.dueDate).isAfter(dayjs(b.dueDate))) {
      return 1;
    } else {
      return 0;
    }
  });
});
</script>

<template>
  <ListLayout>
    <TodoList :todos="sortedTodos" />
  </ListLayout>
</template>
