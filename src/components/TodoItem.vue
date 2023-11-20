<script setup lang="ts">
import { defineProps } from "vue";
import dayjs from "dayjs";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/outline";
import { useTodosStore } from "@/stores/todos";
import type { Todo } from "@/types/todo";
import { storeToRefs } from "pinia";

const { todoToEdit } = storeToRefs(useTodosStore());
const { removeTodo, toggleTodo } = useTodosStore();

const { todo } = defineProps<{
  todo: Todo;
}>();
</script>

<template>
  <li class="px-3 py-2 flex gap-4 items-center justify-between hover:bg-gray-100 transition-all">
    <div class="flex items-center gap-2.5">
      <input
        :id="todo.title"
        type="checkbox"
        :checked="todo.completed"
        @change="() => toggleTodo(todo.id)"
        class="h-5 w-5"
      />
      <label :for="todo.title" class="select-none" :class="{ 'line-through': todo.completed }">{{
        todo.title
      }}</label>
    </div>
    <div class="flex items-center gap-1">
      <p v-if="!!todo.dueDate" class="mr-1 text-sm text-gray-400 select-none">
        {{ dayjs(todo.dueDate).format("DD/MM/YYYY") }}
      </p>
      <button
        class="relative w-5 h-5 flex items-center justify-center rounded-sm bg-blue-400 hover:bg-blue-500 transition-all"
        @click="todoToEdit = todo"
      >
        <PencilIcon class="h-3 w-3 text-white" />
      </button>
      <button
        class="w-5 h-5 flex items-center justify-center rounded-sm bg-red-400 hover:bg-red-500 transition-all"
        @click="() => removeTodo(todo.id)"
      >
        <TrashIcon class="h-3 w-3 text-white" />
      </button>
    </div>
  </li>
</template>
