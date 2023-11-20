import type { User } from "@supabase/supabase-js";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref<User | null>(null);

  return {
    user,
  };
});
