<template>
  <div class="max-w-xl mx-auto">
    <div class="mt-20 w-full flex items-center justify-center">
      <div class="w-full bg-light-primary-subtle dark:bg-dark-primary p-8 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">
          Reset Your Password
        </h2>
        <form @submit.prevent="handleSubmit">
          <div v-if="!tokenWarning" class="mb-4">
            <label
              for="email"
              class="block text-light-text dark:text-dark-text text-sm font-semibold mb-2"
            >Email</label>
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

          <div v-if="!tokenWarning" class="mb-4">
            <label
              for="password"
              class="block text-light-text dark:text-dark-text text-sm font-semibold mb-2"
            >New Password</label>
            <input
              v-model="form.password"
              id="password"
              type="password"
              class="w-full p-2 border border-light-border dark:border-dark-border rounded-lg bg-light-primary dark:bg-dark-primary"
              placeholder="Enter your new password"
              required
            />
            <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password[0] }}</span>
          </div>

          <div v-if="!tokenWarning" class="mb-4">
            <label
              for="password_confirmation"
              class="block text-light-text dark:text-dark-text text-sm font-semibold mb-2"
            >Confirm Password</label>
            <input
              v-model="form.password_confirmation"
              id="password_confirmation"
              type="password"
              class="w-full p-2 border border-light-border dark:border-dark-border rounded-lg bg-light-primary dark:bg-dark-primary"
              placeholder="Confirm your new password"
              required
            />
            <span v-if="errors.password_confirmation" class="text-red-500 text-sm">{{ errors.password_confirmation[0] }}</span>
          </div>

          <div v-if="!tokenWarning" class="flex items-center justify-between mb-4">
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Reset Password
            </button>
          </div>

          <div v-if="tokenWarning" class="text-red-500 mt-4">
            {{ tokenWarning }}
          </div>

          <div v-if="successMessage" class="text-green-500 text-lg mt-4">
            {{ successMessage }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { appConfig } from '~/utils/helpers';

// Define form fields and state
const form = ref({
  email: '',
  password: '',
  password_confirmation: ''
});

const errors = ref({});
const successMessage = ref('');
const tokenWarning = ref('');

// Get the route parameters
const route = useRoute();
const router = useRouter();
const token = route.params.token as string;

// Check if token exists
if (!token) {
  tokenWarning.value = 'Invalid or missing token. Please check your email or contact support.';
} else {
  form.value.token = token;
}

// Function to handle form submission
const handleSubmit = async () => {
  if (tokenWarning.value) return; // Do not proceed if there is a token warning

  try {
    const response = await axios.post(appConfig.api.url('/api/auth/password/set'), form.value);
    successMessage.value = 'Your password has been reset successfully.';
    errors.value = {};
    // Redirect to home page after success
    setTimeout(() => router.push('/'), 2000);
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
