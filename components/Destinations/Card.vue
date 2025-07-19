<template>
  <nuxt-link
    :to="`/destinations/view/${destination.id}`"
    class="block h-full"
  >
    <img
      :src="destination.featured_image"
      :alt="destination.name"
      class="w-full h-60 object-cover rounded-lg mb-4"
    />
    <h2 class="text-lg text-light-text font-semibold mb-2 dark:text-dark-text">
      {{ destination.name }}
    </h2>
    <p
      class="text-light-text mb-2 dark:text-dark-text"
      v-html="destination.short_content"
    ></p>
  </nuxt-link>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { TourType } from "~/types";
// Define props
const props = defineProps<{
  destination: TourType;
}>();

// Access prop with props.destination
const { destination } = props;
</script>
