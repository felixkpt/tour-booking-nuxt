<template>
  <nuxt-link :to="`/tours/${tour.id}`" class="block h-full">
    <img
      :src="tour.featured_image"
      :alt="tour.name"
      class="w-full h-40 object-cover rounded-lg mb-4"
    />
    <h2 class="text-lg text-light-text font-semibold mb-2 dark:text-dark-text">
      {{ tour.name }}
    </h2>
    <p class="text-light-text mb-2 dark:text-dark-text" v-html="tour.description">
    </p>
    <p class="text-light-text font-bold dark:text-dark-text">
      Price: ${{ tour.price }}
    </p>
    <p class="text-light-text dark:text-dark-text">
      Slots Available: {{ tour.slots }}
    </p>
  </nuxt-link>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

// Define the Tour type
interface Tour {
  id: number;
  name: string;
  description: string;
  price: number;
  slots: number;
  featured_image: string;
  image_slides: string[];
}

// Define props
const props = defineProps<{
  tour: Tour;
}>();

// Access prop with props.tour
const { tour } = props;
</script>