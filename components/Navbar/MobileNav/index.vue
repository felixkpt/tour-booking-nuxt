<template>
  <div v-if="mobileMenuOpen" class="lg:hidden">
    <NuxtLink to="/" class="block py-2 px-4 text-sm hover:bg-gray-200">Home</NuxtLink>
    <NuxtLink to="/my-tour-bookings" class="block py-2 px-4 text-sm hover:bg-gray-200">My bookings</NuxtLink>
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
