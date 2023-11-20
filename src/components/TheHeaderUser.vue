<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const { user } = storeToRefs(useUserStore());

const displayName = computed<string>(() => {
  if (!user.value) return "";

  const metadata = user.value.user_metadata;

  if (metadata.first_name && metadata.last_name) {
    return `${metadata.first_name} ${metadata.last_name}`;
  } else if (metadata.full_name) {
    return metadata.full_name;
  } else if (metadata.user_name) {
    return metadata.user_name;
  } else {
    return user.value.email;
  }
});
const initials = computed(() => {
  return displayName.value
    .split(" ")
    .map((name) => name[0])
    .join("");
});
const avatarUrl = computed(() => {
  if (!user.value) return "";

  return user.value.user_metadata.avatar_url;
});
</script>

<template>
  <div
    class="flex p-2 gap-2.5 items-center hover:bg-gray-200 rounded-md transition-all cursor-pointer"
  >
    <div
      v-if="avatarUrl"
      class="w-8 h-8 rounded-full bg-white uppercase text-lg bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${avatarUrl})` }"
    />
    <div
      v-else
      class="w-8 h-8 flex items-center justify-center rounded-full text-blue-600 bg-white uppercase text-lg"
    >
      {{ initials }}
    </div>
    <p class="text-gray-700">
      {{ displayName }}
    </p>
  </div>
</template>
