<template>
  <div
    class="w-[90vw] mx-auto my-4 p-3 bg-light-primary dark:bg-dark-primary rounded-lg shadow-lg"
  >
    <div v-if="destination" class="text-left">
      <!-- Static Featured Image -->
      <div class="my-8">
        <img
          :src="destination.featured_image"
          :alt="destination.name"
          class="min-w-[300px] h-96 rounded-lg"
          v-if="destination.image_slides.length === 0"
        />
        <div v-else>
          <DestinationsViewImageSlides
            :imageSlides="destination.image_slides || []"
          />
        </div>
      </div>
      <!-- Tour Details -->
      <div class="flex justify-between items-center gap-3">
        <h1
          class="tour-name text-4xl font-bold mb-4 leading-tight text-light-text dark:text-dark-text"
        >
          {{ destination.name }}
        </h1>
        <!-- Book Now Button -->
        <button
          @click="$emit('bookTour')"
          class="book-now px-8 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 mb-6"
        >
          Book Now
        </button>
      </div>
      <hr class="my-4" />
      <div class="flex gap-4 mb-6">
        <div class="w-3/4">
          <h3 class="text-xl font-bold mb-4">About</h3>
          <p
            class="tour-destination-content text-lg text-light-text dark:text-dark-text"
            v-html="destination.content"
          ></p>
        </div>
        <aside class="w-1/4">
          <h4 class="text-xl font-semibold mb-3">A reason to visit</h4>
          <p
            class="tour-description text-light-text dark:text-dark-text"
            v-html="destination.short_content"
          ></p>
        </aside>
      </div>
    </div>
    <div v-else class="text-center text-light-text dark:text-dark-text">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { TourType } from "../../../types/tours";

// Define props
const props = defineProps({
  destination: {
    type: Object as () => TourType,
    required: true,
  },
});

const destination = ref(props.destination);
</script>
