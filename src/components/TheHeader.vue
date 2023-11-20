<script setup lang="ts">
import { supabase } from "@/lib/supabaseClient";
import TheHeaderUser from "./TheHeaderUser.vue";
import router from "@/router";
import { useToast } from "vue-toastification";
import { storeToRefs } from "pinia";
import { useTodosStore } from "@/stores/todos";
import { Bars3Icon } from "@heroicons/vue/24/outline";
import { effect, ref } from "vue";
import NavBar from "./NavBar.vue";

const toast = useToast();

const { todos } = storeToRefs(useTodosStore());

const isNavbarOpen = ref(false);

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

effect(() => {
  router.afterEach(() => {
    setTimeout(() => {
      isNavbarOpen.value = false;
    }, 300);
  });
});
</script>

<template>
  <div
    class="relative h-16 pl-5 pr-2.5 gap-1 flex items-center justify-between lg:justify-end bg-gray-100"
  >
    <button
      class="flex items-center justify-center lg:hidden text-gray-700 hover:bg-gray-200 transition-all rounded-md"
      @click="isNavbarOpen = true"
    >
      <Bars3Icon class="h-6 w-6" />
    </button>
    <div class="h-full flex items-center">
      <TheHeaderUser />
      <button
        class="h-12 p-2 text-gray-700 hover:bg-gray-200 transition-all rounded-md"
        @click="handleSignOut"
      >
        Sign Out
      </button>
    </div>
    <div
      class="lg:hidden absolute top-0 h-screen w-screen z-10 transition-all duration-300"
      :style="{ left: isNavbarOpen ? '0' : 'calc(-100%)' }"
    >
      <NavBar @closeNavbar="isNavbarOpen = false" />
    </div>
  </div>
</template>
