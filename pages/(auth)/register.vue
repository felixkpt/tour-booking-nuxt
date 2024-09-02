<template>
  <div class="max-w-lg mx-auto">
    <div class="mt-20 w-full flex items-center justify-center">
      <div class="w-full bg-light-primary-subtle dark:bg-dark-primary p-8 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">
          Register
        </h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label
              for="name"
              class="block text-light-text dark:text-dark-text text-sm font-semibold mb-2"
              >Name</label
            >
            <input
              v-model="form.name"
              id="name"
              type="text"
              class="w-full p-2 border border-light-border dark:border-dark-border rounded-lg bg-light-primary dark:bg-dark-primary"
              placeholder="Enter your name"
              required
            />
            <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name[0] }}</span>
          </div>

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
            <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password[0] }}</span>
          </div>

          <div class="mb-4">
            <label
              for="password_confirmation"
              class="block text-light-text dark:text-dark-text text-sm font-semibold mb-2"
              >Confirm Password</label
            >
            <input
              v-model="form.password_confirmation"
              id="password_confirmation"
              type="password"
              class="w-full p-2 border border-light-border dark:border-dark-border rounded-lg bg-light-primary dark:bg-dark-primary"
              placeholder="Confirm your password"
              required
            />
            <span v-if="errors.password_confirmation" class="text-red-500 text-sm">{{ errors.password_confirmation[0] }}</span>
          </div>

          <div class="mb-4">
            <label
              for="phone"
              class="block text-light-text dark:text-dark-text text-sm font-semibold mb-2"
              >Phone</label
            >
            <input
              v-model="form.phone"
              id="phone"
              type="tel"
              class="w-full p-2 border border-light-border dark:border-dark-border rounded-lg bg-light-primary dark:bg-dark-primary"
              placeholder="Enter your phone number"
            />
            <span v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone[0] }}</span>
          </div>

          <div class="mb-4">
            <label
              for="avatar"
              class="block text-light-text dark:text-dark-text text-sm font-semibold mb-2"
              >Avatar URL</label
            >
            <input
              v-model="form.avatar"
              id="avatar"
              type="text"
              class="w-full p-2 border border-light-border dark:border-dark-border rounded-lg bg-light-primary dark:bg-dark-primary"
              placeholder="Enter your avatar URL"
            />
            <span v-if="errors.avatar" class="text-red-500 text-sm">{{ errors.avatar[0] }}</span>
          </div>

          <div class="flex items-center justify-between mb-4">
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Register
            </button>
          </div>
        </form>

        <div class="mt-4 text-center">
          <router-link
            to="/login"
            class="text-blue-500 hover:underline dark:text-blue-400"
          >
            Already have an account? Login
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { appConfig } from '~/utils/helpers';

// Define form fields
const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  phone: '',
  avatar: ''
});

const errors = ref({});
const successMessage = ref('');
const router = useRouter();

// Handle form submission
const handleSubmit = async () => {
  try {
    const response = await axios.post(
      appConfig.api.url('/api/auth/register'),
      form.value
    );
    if (response.data.status) {
      // Store user and token
      localStorage.setItem('user', JSON.stringify(response.data.results));
      successMessage.value = 'Registration successful! You are now logged in.';
      errors.value = {};
      // Navigate to the homepage
      router.push('/');
    }
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    }
  }
};
</script>