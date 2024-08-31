<template>
    <div class="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
      <img :src="tour.image" alt="Tour Image" class="w-full h-64 object-cover">
      <div class="p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ tour.name }}</h2>
        <p class="text-gray-600 text-sm mb-4">{{ tour.destination.name }}</p>
        <p class="text-gray-700 mb-4">{{ tour.description }}</p>
        <div class="flex justify-between items-center">
          <span class="text-xl font-semibold text-gray-800">${{ tour.price }}</span>
          <button
            @click="bookTour"
            class="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Book Now
          </button>
        </div>
        <div v-if="tour.slots > 0" class="mt-4 text-green-600">
          {{ tour.slots }} slots available
        </div>
        <div v-else class="mt-4 text-red-600">
          No slots available
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      tour: {
        type: Object,
        required: true,
      },
    },
    methods: {
      bookTour() {
        // Implement booking functionality here
        this.$emit('bookTour', this.tour.id);
      },
    },
  };
  </script>
  