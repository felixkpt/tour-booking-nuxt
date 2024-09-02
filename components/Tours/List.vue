<template>
  <div>
    <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      <li
        v-for="tour in tours"
        :key="tour.id"
        class="bg-light-primary shadow-lg rounded-lg p-4 dark:bg-dark-primary transition-transform transform hover:scale-[1.02] hover:shadow-lg cursor-pointer"
      >
        <ToursTourCard :tour="tour" />
      </li>
    </ul>
    <div class="flex justify-between p-4">
      <button 
        :disabled="currentPage <= 1"
        @click="fetchPage(currentPage - 1)"
        class="bg-gray-500 text-white p-2 rounded"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button 
        :disabled="currentPage >= totalPages"
        @click="fetchPage(currentPage + 1)"
        class="bg-gray-500 text-white p-2 rounded"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  results: any;
  title: string;
  description: string;
  fetchPage: (page: number) => void;
  currentPage: number;
  totalPages: number;
}>();

const tours = props.results?.data;
const title = props.title;
const description = props.description;
</script>
