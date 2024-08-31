<template>
  <div>
    <div
      class="bg-light-primary-subtle text-light-text p-6 text-center dark:bg-dark-primary-subtle dark:text-dark-text cursor-default"
    >
      <h1
        class="text-4xl font-bold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300"
      >
        TravelMate: Discover Your Next Adventure
      </h1>
      <p class="text-lg max-w-3xl mx-auto">
        TravelMate offers a wide range of tours to exciting destinations.
        Explore our available tours, view detailed information, and book your
        next adventure with ease.
      </p>
    </div>
    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      <li
        v-for="tour in tours"
        :key="tour.id"
        class="bg-light-primary shadow-lg rounded-lg p-4 dark:bg-dark-primary"
      >
        <img
          :src="tour.featured_image"
          :alt="tour.name"
          class="w-full h-40 object-cover rounded-lg mb-4"
        />
        <h2
          class="text-lg text-light-text font-semibold mb-2 dark:text-dark-text"
        >
          {{ tour.name }}
        </h2>
        <p class="text-light-text mb-2 dark:text-dark-text">
          {{ tour.description }}
        </p>
        <p class="text-light-text font-bold dark:text-dark-text">
          Price: ${{ tour.price }}
        </p>
        <p class="text-light-text dark:text-dark-text">
          Slots Available: {{ tour.slots }}
        </p>
        <div class="image-slides mt-4">
          <h3 class="font-semibold text-light-text dark:text-dark-text">
            Gallery:
          </h3>
          <div class="flex space-x-2 mt-2 justify-start">
            <img
              v-for="(image, index) in tour.image_slides"
              :key="index"
              :src="image"
              :alt="`${tour.name} slide ${index + 1}`"
              class="w-24 h-24 object-cover rounded"
            />
          </div>
        </div>
        <nuxt-link
          :to="`/tours/${tour.id}`"
          class="block mt-4 text-blue-500 underline text-center dark:text-blue-300"
        >
          View Tour
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";

interface Tour {
  id: number;
  name: string;
  description: string;
  price: number;
  slots: number;
  featured_image: string;
  image_slides: string[];
}

const { data } = await useFetch("http://localhost:3000/api/tours");

// Use a strongly typed ref to ensure correct data structure
const tours: Ref<Tour[]> = data;

useHead({
  title: "TravelMate - Discover Your Next Adventure",
  meta: [
    {
      name: "description",
      content:
        "TravelMate offers a wide range of tours to exciting destinations. Explore our available tours, view detailed information, and book your next adventure with ease.",
    },
    {
      name: "keywords",
      content: "travel, tours, adventure, travelmate, vacation, holiday",
    },
  ],
  bodyAttrs: {
    class: "test",
  },
});
</script>

<style scoped>
.image-slides img {
  object-fit: cover;
  border-radius: 0.25rem;
}
</style>
