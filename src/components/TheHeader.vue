<script setup lang="ts">
import { supabase } from "@/lib/supabaseClient";
import TheHeaderUser from "./TheHeaderUser.vue";
import router from "@/router";
import { useToast } from "vue-toastification";
import { storeToRefs } from "pinia";
import { useTodosStore } from "@/stores/todos";

const toast = useToast();

const { todos } = storeToRefs(useTodosStore());

const handleSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    todos.value = [];
    router.push("/auth");
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }
};
</script>

<template>
  <div class="h-16 px-2.5 gap-1 flex items-center justify-end grow bg-gray-100">
    <TheHeaderUser />
    <button
      class="h-12 p-2 text-gray-700 hover:bg-gray-200 transition-all rounded-md"
      @click="handleSignOut"
    >
      Sign Out
    </button>
  </div>
</template>
