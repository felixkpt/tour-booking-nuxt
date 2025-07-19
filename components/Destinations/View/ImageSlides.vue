<template>
  <div class="flex flex-col items-center">
    <div class="w-full mb-6 overflow-hidden relative">
      <div
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div
          v-for="(image, index) in imageSlides"
          :key="index"
          class="flex-none w-full sm:w-1/2 lg:w-1/3 p-2"
        >
          <img
            :src="image.image_path"
            :alt="`Slide ${index + 1}`"
            class="w-full h-60 object-cover rounded-lg"
          />
        </div>
      </div>

      <button
        @click="prevSlide"
        aria-label="prev"
        class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-full z-10"
      >
        ‹
      </button>
      <button
        @click="nextSlide"
        aria-label="next"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-full z-10"
      >
        ›
      </button>
    </div>

    <div
      v-if="imageSlides.length === 0"
      class="no-slides-message p-4 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg"
    >
      No slides available.
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import type { TourDestination } from "~/types";

const props = defineProps({
  imageSlides: {
    type: Array as () => TourDestination["image_slides"],
    required: true,
  },
});

const imageSlides = props.imageSlides;
const currentSlide = ref(0);

const visibleSlides = () => {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
};

const nextSlide = () => {
  const slidesToShow = visibleSlides();
  currentSlide.value =
    (currentSlide.value + 1) % Math.ceil(imageSlides.length / slidesToShow);
};

const prevSlide = () => {
  const slidesToShow = visibleSlides();
  currentSlide.value =
    (currentSlide.value - 1 + Math.ceil(imageSlides.length / slidesToShow)) %
    Math.ceil(imageSlides.length / slidesToShow);
};

let interval: any;

onMounted(() => {
  interval = setInterval(nextSlide, 4000);
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>
