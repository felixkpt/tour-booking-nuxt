<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center p-4">
      <p class="text-lg text-gray-600 dark:text-gray-300">Loading...</p>
    </div>

    <!-- No Tours Message -->
    <div
      v-if="!loading && destinations.length === 0"
      class="flex flex-col items-center justify-center p-4 text-center"
    >
      <p class="text-lg font-semibold text-gray-600 dark:text-gray-300">
        No destinations available
      </p>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        There are currently no destinations to display. Please check back
        later.
      </p>
    </div>

    <!-- Tours List -->
    <ul
      v-else-if="destinations.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4"
    >
      <li
        v-for="destination in destinations"
        :key="destination.id"
        class="bg-light-primary shadow-lg rounded-lg p-4 dark:bg-dark-primary transition-transform transform hover:scale-[1.02] hover:shadow-lg cursor-pointer"
      >
        <DestinationsCard :destination="destination" />
      </li>
    </ul>

    <!-- Pagination -->
    <div v-if="destinations.length > 0" class="flex justify-between p-4">
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
  data: any;
  title: string;
  description: string;
  fetchPage: (page: number) => void;
  currentPage: number;
  totalPages: number;
  loading: boolean; // New prop for loading state
}>();

const destinations = props.data || [];
</script>
