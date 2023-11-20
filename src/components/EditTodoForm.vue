<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useTodosStore } from "@/stores/todos";
import { storeToRefs } from "pinia";

const { todoToEdit } = storeToRefs(useTodosStore());
const { addTodo, updateTodo } = useTodosStore();

const submit = () => {
  if (todoToEdit.value) {
    updateTodo(todoToEdit.value.id, {
      title: title.value,
      dueDate: dueDate.value,
    });
  } else {
    addTodo({
      title: title.value,
      dueDate: dueDate.value,
    });
  }
  title.value = "";
  dueDate.value = null;
  todoToEdit.value = null;
};

const title = ref("");
const dueDate = ref<string | null>(null);

watchEffect(() => {
  title.value = todoToEdit.value?.title ?? "";
  dueDate.value = todoToEdit.value?.dueDate ?? null;
});
</script>

<template>
  <div class="w-full flex items-center mb-5">
    <form @submit.prevent="submit" class="w-full gap-2.5 flex flex-col lg:flex-row lg:items-center">
      <input
        type="text"
        placeholder="Add a new todo"
        v-model="title"
        class="h-10 flex grow px-4 border border-gray-200 rounded-md"
      />
      <input
        type="date"
        v-model="dueDate"
        class="h-10 lg:grow-0 px-4 w-full lg:w-48 border border-gray-200 rounded-md"
      />
      <button
        type="submit"
        class="px-5 h-10 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all"
      >
        {{ todoToEdit ? "Update" : "Add" }}
      </button>
    </form>
  </div>
</template>
