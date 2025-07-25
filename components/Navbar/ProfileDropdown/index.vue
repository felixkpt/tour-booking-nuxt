<!-- components/Navbar/ProfileDropdown/index.vue -->
<template>
  <div>
    <div class="relative" @click="$emit('toggleDropdown')">
      <button class="flex items-center focus:outline-none">
        <img
          v-if="authUser && authUser.avatar"
          :src="authUser.avatar"
          alt="User Avatar"
          class="h-10 w-10 rounded-full border border-light-primary-subtle dark:border-dark-primary-subtle"
        />
        <img
          v-else
          :src="defaultAvatar"
          alt="Default Avatar"
          class="h-10 w-10 rounded-full border border-light-primary-subtle dark:border-dark-primary-subtle"
        />
        <svg
          class="w-4 h-4 ml-2 text-light-text dark:text-dark-text"
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
        class="absolute right-0 mt-2 w-48 bg-light-primary border border-light-primary-subtle rounded shadow-lg py-1 z-20 dark:bg-dark-primary dark:border-dark-primary-subtle"
      >
        <a
          v-if="authUser"
          href="/my-tour-bookings"
          class="block px-4 py-2 text-light-text hover:bg-light-primary-subtle dark:text-dark-text dark:hover:bg-dark-primary-subtle"
        >
          My tours
        </a>
        <a
          v-if="authUser"
          href="#"
          @click.prevent="handleLogout"
          class="block px-4 py-2 text-light-text hover:bg-light-primary-subtle dark:text-dark-text dark:hover:bg-dark-primary-subtle"
        >
          Logout
        </a>
        <a
          v-else
          href="/login"
          class="block px-4 py-2 text-light-text hover:bg-light-primary-subtle dark:text-dark-text dark:hover:bg-dark-primary-subtle"
        >
          Login
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuthUser } from "~/composables/useAuthUser";

export default defineComponent({
  props: {
    dropdownOpen: {
      type: Boolean as () => boolean,
      required: true,
    },
  },
  setup() {
    const authUser = useAuthUser();
    const defaultAvatar = "/images/default-avatar.png"; // Set your default avatar path here

    // Handle authUser logout
    const handleLogout = () => {
      localStorage.removeItem("authUser");
      authUser.value = null;
      window.location.href = "/";
    };

    return {
      authUser,
      handleLogout,
      defaultAvatar,
    };
  },
});
</script>
