<template>
  <div v-if="mobileMenuOpen" class="lg:hidden">
    <NuxtLink to="/" class="block py-2 px-4 text-sm hover:bg-gray-200">Home</NuxtLink>
    <NuxtLink to="/" class="block py-2 px-4 text-sm hover:bg-gray-200">About</NuxtLink>
    <NuxtLink to="/" class="block py-2 px-4 text-sm hover:bg-gray-200">Services</NuxtLink>
    <NuxtLink to="/" class="block py-2 px-4 text-sm hover:bg-gray-200">Profile</NuxtLink>
    <NuxtLink to="/" class="block py-2 px-4 text-sm hover:bg-gray-200">Settings</NuxtLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    mobileMenuOpen: {
      type: Boolean as () => boolean,
      required: true,
    },
  },
});
</script>
