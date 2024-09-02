<template>
  <div>
    <div
      class="bg-light-primary-subtle text-light-text p-8 text-center dark:bg-dark-primary-subtle dark:text-dark-text cursor-default"
    >
      <h1
        class="text-4xl font-bold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300"
      >
        {{ title }}
      </h1>
      <p class="text-lg max-w-3xl mx-auto">
        {{ description }}
      </p>
    </div>
    <!-- Search Input -->
    <div class="p-4">
      <input
        type="text"
        v-model="searchQuery"
        @input="debouncedSearch"
        placeholder="Search tours..."
        class="w-full p-2 border dark:border-gray-500 dark:text-gray-100 rounded dark:bg-light-text shadow"
      />
    </div>

    <ToursList
      :key="results"
      :results="results"
      :title="title"
      :description="description"
      :fetchPage="fetchPage"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, watch, onMounted } from "vue";
import axios from "axios";
import { appConfig } from "~/utils/helpers";
import _ from "lodash";
const { debounce } = _;

const results: Ref<any[]> = ref([]);
const title = "TravelMate - Discover Your Next Adventure";
const description =
  "TravelMate offers a wide range of tours to exciting destinations. Explore our available tours, view detailed information, and book your next adventure with ease.";
const perPage = ref(9);
const currentPage = ref(1);
const totalPages = ref(1);
const searchQuery = ref("");
const loading = ref(true); // loading state

// Function to fetch tours
const fetchTours = async (page: number = 1, search: string = "") => {
  loading.value = true; // Set loading to true before fetching

  try {
    const response = await axios.get(
      appConfig.api.url(
        `/api/tours?page=${page}&search=${search}&per_page=${perPage.value}`
      )
    );
    results.value = response.data.results;
    totalPages.value = response.data.results.last_page;
    currentPage.value = page;
  } catch (error) {
    console.error("Error fetching tours:", error);
  } finally {
    loading.value = false; // Set loading to false after fetching
  }
};

// Fetch data when component is mounted if token is already available
onMounted(() => {
  fetchTours();
});

// Function to fetch page data
function fetchPage(page: number) {
  if (page > 0 && page <= totalPages.value) {
    fetchTours(page, searchQuery.value);
  }
}

// Debounce the search input
const debouncedSearch = debounce(() => {
  fetchPage(1);
}, 300);

useHead({
  title,
  meta: [
    {
      name: "description",
      content: description,
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
