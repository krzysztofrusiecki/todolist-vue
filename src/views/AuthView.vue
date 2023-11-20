<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import { supabase } from "@/lib/supabaseClient";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/vue";
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";
import type { LoginFields, RegisterFields } from "@/types/auth";
import { type Provider } from "@supabase/supabase-js";
import router from "@/router";

const toast = useToast();

const loading = ref(false);

const handleLogin = async (values: LoginFields) => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithPassword(values);

    if (error) throw error;

    router.push("/today");
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  } finally {
    loading.value = false;
  }
};

const handleLoginWithOAuth = async (provider: Provider) => {
  await supabase.auth.signInWithOAuth({ provider });
};

const handleRegister = async (values: RegisterFields) => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          first_name: values.firstName,
          last_name: values.lastName,
        },
      },
    });

    if (error) throw error;

    router.push("/today");
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if ("error_description" in router.currentRoute.value.query) {
    toast.error(router.currentRoute.value.query.error_description as string);
    router.replace({ query: {} });
  }
});
</script>

<template>
  <div class="w-full grid grid-cols-12 h-full items-center">
    <div class="hidden lg:block lg:col-span-4"></div>
    <div class="col-span-12 lg:col-span-4">
      <TabGroup>
        <TabList class="flex space-x-1 rounded-xl bg-blue-50 p-1">
          <Tab class="grow" v-slot="{ selected }">
            <button
              :class="[
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                selected ? 'bg-blue-500 text-white shadow' : 'text-blue-500 bg-blue-50',
              ]"
            >
              Sign In
            </button>
          </Tab>
          <Tab class="grow" v-slot="{ selected }">
            <button
              :class="[
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                selected ? 'bg-blue-500 text-white shadow' : 'text-blue-500 bg-blue-50',
              ]"
            >
              Sign Up
            </button>
          </Tab>
        </TabList>
        <TabPanels class="mt-2">
          <TabPanel
            :class="[
              'rounded-xl bg-white p-3',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
            ]"
          >
            <LoginForm
              :loading="loading"
              @submit="handleLogin"
              @loginWithOAuth="handleLoginWithOAuth"
            />
          </TabPanel>
          <TabPanel
            :class="[
              'rounded-xl bg-white p-3',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
            ]"
          >
            <RegisterForm :loading="loading" @submit="handleRegister" />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  </div>
</template>
