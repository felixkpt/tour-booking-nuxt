<template>
  <div class="max-w-xl mx-auto">
    <div class="mt-20 w-full flex items-center justify-center">
      <div class="w-full bg-light-primary-subtle dark:bg-dark-primary p-8 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">
          Reset Password
        </h2>
        <form v-if="!successMessage" @submit.prevent="handleSubmit">
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
            <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email[0] }}</span>
          </div>

          <div class="flex items-center justify-between mb-4">
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Send Reset Link
            </button>
          </div>
        </form>

        <div v-if="successMessage" class="text-green-500 mt-4 text-xl cursor-default">
          {{ successMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { appConfig } from '~/utils/helpers';

// Define form fields and state
const form = ref({
  email: ''
});

const errors = ref({});
const successMessage = ref('');

// Handle form submission
const handleSubmit = async () => {
  try {
    const response = await axios.post(appConfig.api.url('/api/auth/password/send-reset-link'), form.value);
    successMessage.value = 'A password reset link has been sent to your email.';
    errors.value = {};
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else if (error.response && error.response.data.message) {
      successMessage.value = ''; // Clear success message if an error occurs
      errors.value = { email: [error.response.data.message] };
    }
  }
};
</script>
