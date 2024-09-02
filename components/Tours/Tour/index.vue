<template>
  <div
    class="max-w-7xl mx-auto my-8 p-6 bg-light-primary dark:bg-dark-primary rounded-lg shadow-lg"
  >
    <div v-if="tour" class="text-left">
      <!-- Static Featured Image -->
      <img
        :src="tour.featured_image"
        :alt="tour.name"
        class="w-full h-96 object-cover rounded-lg mb-6"
      />

      <!-- Tour Details -->
      <h1
        class="tour-name text-4xl font-bold mb-4 leading-tight text-light-text dark:text-dark-text"
      >
        {{ tour.name }}
      </h1>
      <div class="flex justify-between items-center gap-3">
        <p class="tour-price text-xl text-light-text dark:text-dark-text mb-6">
          Price: ${{ tour.price }}
        </p>
        <p
          class="tour-slots-available text-xl text-light-text dark:text-dark-text mb-6"
        >
          Slots Available: {{ tour.slots }}
        </p>

        <!-- Book Now Button -->
        <button
          @click="$emit('bookTour')"
          class="book-now px-8 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 mb-6"
        >
          Book Now
        </button>
      </div>
      <hr class="my-4" />
      <p
        class="tour-description text-lg text-light-text dark:text-dark-text mb-6"
      >
        {{ tour.description }}
      </p>

      <div class="mt-20">
        <ToursTourImageSlides :imageSlides="tour.image_slides || []" />
      </div>
    </div>
    <div v-else class="text-center text-light-text dark:text-dark-text">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { TourType } from "~/types/tours";

// Define props
const props = defineProps({
  tour: {
    type: Object as () => TourType,
    required: true,
  },
});

const tour = ref(props.tour);
console.log("TTTT", tour);
</script>
