<template>
  <div>
    <div class="hidden md:flex items-center space-x-3">
      <div class="relative" @click="$emit('toggleDropdown')">
        <button class="flex items-center focus:outline-none">
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            class="h-10 w-10 rounded-full"
          />
          <svg
            class="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <div
          v-if="dropdownOpen"
          class="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-1 z-20"
        >
          <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >Profile</a
          >
          <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >Settings</a
          >
          <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >Logout</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    dropdownOpen: {
      type: Boolean as () => boolean,
      required: true,
    },
  },
});
</script>
