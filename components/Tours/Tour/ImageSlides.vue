<template>
  <div class="flex flex-col items-center">
    <h3 class="text-3xl font-semibold text-light-text dark:text-dark-text mb-8">
      Photos
    </h3>
    <div class="w-10/12">
      <!-- Image Carousel -->
      <div v-if="imageSlides.length > 0" class="carousel-container">
        <div
          v-for="(image, index) in imageSlides"
          :key="index"
          class="carousel-slide"
          :class="{ active: currentSlide === index }"
        >
          <img
            :src="image.image_path"
            :alt="`Slide ${index + 1}`"
            class="w-full max-h-96 object-cover rounded-lg mb-4"
          />
        </div>
        <!-- Carousel Controls -->
        <button
          @click="prevSlide"
          aria-label="prev"
          class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-full"
        >
          ‹
        </button>
        <button
          @click="nextSlide"
          aria-label="next"
          class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-full"
        >
          ›
        </button>
      </div>
      <!-- No Slides Message -->
      <div v-else class="no-slides-message p-4 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg">
        No slides available.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Define props
const props = defineProps({
  imageSlides: {
    type: Array as () => string[],
    required: true,
  },
});

// State for managing carousel slides
const currentSlide = ref(0);
const imageSlides = props.imageSlides;

// Carousel controls
const prevSlide = () => {
  currentSlide.value =
    currentSlide.value === 0 ? imageSlides.length - 1 : currentSlide.value - 1;
};

const nextSlide = () => {
  currentSlide.value =
    currentSlide.value === imageSlides.length - 1 ? 0 : currentSlide.value + 1;
};
</script>

<style scoped>
/* Add necessary styles for your carousel */
.carousel-container {
  position: relative;
}

.carousel-slide {
  display: none;
}

.carousel-slide.active {
  display: block;
}

/* Style for no slides message */
.no-slides-message {
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
}
</style>
