<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/NavBar.vue";
import EditTodoForm from "./components/EditTodoForm.vue";
import { effect, onMounted, ref } from "vue";
import { supabase } from "./lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import { storeToRefs } from "pinia";
import { useTodosStore } from "./stores/todos";
import { useUserStore } from "./stores/user";
import TheHeader from "./components/TheHeader.vue";

const { user } = storeToRefs(useUserStore());
const { fetchTodos } = useTodosStore();

const session = ref<Session | null>();

effect(async () => {
  if (user.value) {
    fetchTodos();
  }
});

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
    user.value = data.session?.user ?? null;
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
    user.value = _session?.user ?? null;
  });
});
</script>

<template>
  <div class="w-full h-screen flex">
    <NavBar v-if="session" />

    <div class="h-full w-full">
      <TheHeader v-if="session" />
      <main class="px-10 py-5 flex flex-col grow">
        <EditTodoForm v-if="session" />

        <RouterView />
      </main>
    </div>
  </div>
</template>
