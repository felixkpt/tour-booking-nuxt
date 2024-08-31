<template>
    <button @click="toggleTheme" class="p-2 bg-gray-200 dark:bg-gray-800 rounded">
      <span v-if="isDarkMode">🌙</span>
      <span v-else>🌞</span>
    </button>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const isDarkMode = ref(false);
  
  // Toggle the theme between light and dark
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
    document.documentElement.classList.toggle('dark', isDarkMode.value);
  };
  </script>
  
  <style scoped>
  button {
    transition: background-color 0.3s ease;
  }
  </style>
  