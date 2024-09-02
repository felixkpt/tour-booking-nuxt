<template>
  <div class="max-w-lg mx-auto">
    <div class="mt-20 w-full flex items-center justify-center">
      <div
        class="w-full bg-light-primary-subtle dark:bg-dark-primary p-8 rounded-lg shadow-lg"
      >
        <h2 class="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">
          Login
        </h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label
              for="email"
              class="block text-light-text dark:text-dark-text text-sm font-semibold mb-2"
              >Email</label
            >
            <input
              v-model="form.email"
              id="email"
              type="email"
              class="w-full p-2 border border-light-border dark:border-dark-border rounded-lg bg-light-primary dark:bg-dark-primary"
              placeholder="Enter your email"
              required
            />
            <span v-if="errors.email" class="text-red-500 text-sm">
              {{ errors.email[0] }}
            </span>
          </div>

          <div class="mb-4">
            <label
              for="password"
              class="block text-light-text dark:text-dark-text text-sm font-semibold mb-2"
              >Password</label
            >
            <input
              v-model="form.password"
              id="password"
              type="password"
              class="w-full p-2 border border-light-border dark:border-dark-border rounded-lg bg-light-primary dark:bg-dark-primary"
              placeholder="Enter your password"
              required
            />
            <span v-if="errors.password" class="text-red-500 text-sm">
              {{ errors.password[0] }}
            </span>
          </div>

          <div class="flex items-center justify-between mb-4">
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </form>

        <div class="mt-4 text-center">
          <router-link
            to="/register"
            class="text-blue-500 hover:underline dark:text-blue-400"
          >
            Register
          </router-link>
          <span class="mx-2">|</span>
          <router-link
            to="/password/forgot"
            class="text-blue-500 hover:underline dark:text-blue-400"
          >
            Forgot Password?
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { appConfig } from "~/utils/helpers";
import { useAuthUser } from "~/composables/user";

const form = ref({
  email: "",
  password: "",
});

const errors = ref({});
const successMessage = ref("");
const router = useRouter();
const authUser = useAuthUser();

const handleSubmit = async () => {
  try {
    const response = await axios.post(
      appConfig.api.url("/api/auth/login"),
      form.value
    );
    if (response.data.results) {
      // Set and store user and token
      authUser.value = response.data.results
      localStorage.setItem("authUser", JSON.stringify(response.data.results));
      successMessage.value = "Login successful!";
      errors.value = {};
      // Navigate to the homepage
      router.push("/");
    }
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    }
  }
};
</script>
