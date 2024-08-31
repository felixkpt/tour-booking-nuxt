<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between">
        <!-- Logo -->
        <NavbarLogo />

        <!-- Primary Nav -->
        <NavbarPrimaryNav />

        <!-- User Profile Dropdown -->
        <NavbarProfileDropdown
          @toggleDropdown="toggleDropdown"
          :dropdownOpen="dropdownOpen"
        />

        <!-- Mobile menu button -->
        <NavbarMobileMenuButton @toggleMobileMenu="toggleMobileMenu" />
        <NavbarThemeToggler />
      </div>
    </div>

    <!-- Mobile Nav -->
    <NavbarMobileNav :mobileMenuOpen="mobileMenuOpen" />
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
