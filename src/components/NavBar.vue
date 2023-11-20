<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import dayjs from "dayjs";
import { useTodosStore } from "@/stores/todos";
import NavLogo from "./NavLogo.vue";
import router from "@/router";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const emit = defineEmits<{
  closeNavbar: [];
}>();

const { uncompletedTodos } = storeToRefs(useTodosStore());

const activeRoute = computed(() => {
  return router.currentRoute.value.path;
});

const todayTodos = computed(() => {
  return uncompletedTodos.value.filter((todo) => {
    return dayjs(todo.dueDate).isSame(dayjs(), "day");
  });
});

const tomorrowTodos = computed(() => {
  return uncompletedTodos.value.filter((todo) => {
    return dayjs(todo.dueDate).isSame(dayjs().add(1, "day"), "day");
  });
});

const nextWeekTodos = computed(() => {
  return uncompletedTodos.value.filter((todo) => {
    return (
      dayjs(todo.dueDate).isAfter(dayjs(), "day") &&
      dayjs(todo.dueDate).isBefore(dayjs().add(7, "day"), "day")
    );
  });
});
</script>

<template>
  <aside class="relative w-full h-full py-5 bg-blue-600 flex flex-col justify-between">
    <button
      class="absolute top-5 right-5 p-2 lg:hidden flex items-center justify-center hover:bg-blue-700 transition-all rounded-md text-white"
      @click="emit('closeNavbar')"
    >
      <XMarkIcon class="h-6 w-6" />
    </button>
    <div class="flex flex-col">
      <div class="w-full mb-5 flex justify-center items-center">
        <NavLogo />
      </div>
      <nav class="px-2 flex flex-col gap-0.5">
        <RouterLink
          to="/today"
          class="px-5 py-1.5 text-white hover:bg-blue-700 transition-all rounded-md"
          :class="{ 'bg-blue-800 hover:bg-blue-800': activeRoute === '/today' }"
          >Today{{ todayTodos.length ? ` (${todayTodos.length})` : "" }}</RouterLink
        >
        <RouterLink
          to="/tomorrow"
          class="px-5 py-1.5 text-white hover:bg-blue-700 transition-all rounded-md"
          :class="{
            'bg-blue-800 hover:bg-blue-800': activeRoute === '/tomorrow',
          }"
          >Tomorrow{{ tomorrowTodos.length ? ` (${tomorrowTodos.length})` : "" }}</RouterLink
        >
        <RouterLink
          to="/next-week"
          class="px-5 py-1.5 text-white hover:bg-blue-700 transition-all rounded-md"
          :class="{
            'bg-blue-800 hover:bg-blue-800': activeRoute === '/next-week',
          }"
          >Next Week{{ nextWeekTodos.length ? ` (${nextWeekTodos.length})` : "" }}</RouterLink
        >
        <RouterLink
          to="/all"
          class="px-5 py-1.5 text-white hover:bg-blue-700 transition-all rounded-md"
          :class="{ 'bg-blue-800 hover:bg-blue-800': activeRoute === '/all' }"
          >All{{ uncompletedTodos.length ? ` (${uncompletedTodos.length})` : "" }}</RouterLink
        >
      </nav>
    </div>
  </aside>
</template>
