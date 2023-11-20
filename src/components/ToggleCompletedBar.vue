<script setup lang="ts">
import { useTodosStore } from "@/stores/todos";
import { storeToRefs } from "pinia";
import ToggleSwitch from "./ToggleSwitch.vue";

const { showCompleted } = storeToRefs(useTodosStore());
</script>

<template>
  <div class="h-10 w-full flex items-center justify-end mb-5">
    <ToggleSwitch v-model="showCompleted"
      ><p class="select-none">Show completed todos</p></ToggleSwitch
    >
  </div>
</template>
