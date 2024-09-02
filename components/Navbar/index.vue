<template>
  <nav class="bg-light-primary shadow-lg dark:bg-dark-primary">
    <div class="max-w-7xl mx-auto px-4 py-2">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <NavbarLogo class="text-light-text dark:text-dark-text" />

        <!-- Primary Nav -->
        <NavbarPrimaryNav class="text-light-text dark:text-dark-text" />

        <!-- User Profile Dropdown -->
        <NavbarProfileDropdown
          @toggleDropdown="toggleDropdown"
          :dropdownOpen="dropdownOpen"
          class="text-light-text dark:text-dark-text"
        />

        <!-- Mobile menu button -->
        <NavbarMobileMenuButton
          @toggleMobileMenu="toggleMobileMenu"
          class="text-light-text dark:text-dark-text"
        />

        <!-- Theme Toggler -->
        <NavbarThemeToggler class="text-light-text dark:text-dark-text" />
      </div>
    </div>

    <!-- Mobile Nav -->
    <NavbarMobileNav :mobileMenuOpen="mobileMenuOpen" class="bg-light-primary dark:bg-dark-primary" />
  </nav>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";

export default defineComponent({
  setup() {
    const dropdownOpen = ref<boolean>(false);
    const mobileMenuOpen = ref<boolean>(false);

    const toggleDropdown = (): void => {
      dropdownOpen.value = !dropdownOpen.value;
    };

    const toggleMobileMenu = (): void => {
      mobileMenuOpen.value = !mobileMenuOpen.value;
    };

    return {
      dropdownOpen,
      mobileMenuOpen,
      toggleDropdown,
      toggleMobileMenu,
    };
  },
});
</script>
