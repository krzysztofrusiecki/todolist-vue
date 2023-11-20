<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import { Switch } from "@headlessui/vue";

const props = defineProps<{
  modelValue: boolean;
}>();
const emits = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});
</script>

<template>
  <div class="flex items-center gap-2.5">
    <slot />
    <Switch
      v-model="value"
      :class="value ? 'bg-blue-500' : 'bg-gray-400'"
      class="relative inline-flex h-6 w-11 items-center rounded-full"
    >
      <span
        :class="value ? 'translate-x-6' : 'translate-x-1'"
        class="inline-block h-4 w-4 transform rounded-full bg-white transition"
      />
    </Switch>
  </div>
</template>
