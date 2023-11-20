<script setup lang="ts">
import type { RegisterFields } from "@/types/auth";
import { ref } from "vue";
import { z } from "zod";

const props = defineProps<{
  loading: boolean;
}>();
const emit = defineEmits<{
  submit: [values: RegisterFields];
}>();

const email = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
const errors = ref<RegisterFields>({
  email: "",
  password: "",
  firstName: "",
  lastName: "",
});

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
});

const submit = () => {
  errors.value = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  };
  try {
    const data = authSchema.parse({
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
    });

    emit("submit", data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      errors.value = Object.entries(error.flatten().fieldErrors).reduce<RegisterFields>(
        (acc, [field, err]) => ({
          ...acc,
          [field]: err?.[0] ?? "",
        }),
        {} as RegisterFields,
      );
    }
  }
};
</script>

<template>
  <form class="w-full" @submit.prevent="submit">
    <div class="w-full flex flex-col gap-2.5">
      <h1 class="mb-5 text-2xl text-center font-bold">Sign Up</h1>
      <div class="flex flex-col gap-2.5">
        <input
          class="h-10 w-full px-4 border border-gray-200 rounded-md"
          required
          placeholder="Your email"
          v-model="email"
        />
        <p v-if="errors.email" class="text-sm text-red-500">{{ errors.email }}</p>

        <input
          class="h-10 w-full px-4 border border-gray-200 rounded-md"
          required
          placeholder="Your first name"
          v-model="firstName"
        />
        <p v-if="errors.firstName" class="text-sm text-red-500">{{ errors.firstName }}</p>

        <input
          class="h-10 w-full px-4 border border-gray-200 rounded-md"
          required
          placeholder="Your last name"
          v-model="lastName"
        />
        <p v-if="errors.lastName" class="text-sm text-red-500">{{ errors.lastName }}</p>

        <input
          class="h-10 w-full px-4 border border-gray-200 rounded-md"
          required
          type="password"
          placeholder="Your password"
          v-model="password"
        />
        <p v-if="errors.password" class="text-sm text-red-500">{{ errors.password }}</p>
      </div>
      <div>
        <button
          type="submit"
          class="h-10 w-full rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all"
          :disabled="props.loading"
        >
          {{ props.loading ? "Loading" : "Submit" }}
        </button>
      </div>
    </div>
  </form>
</template>
