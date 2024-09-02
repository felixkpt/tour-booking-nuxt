<template>
  <div>
    <!-- Search Input -->
    <div class="p-4">
      <input
        type="text"
        v-model="searchQuery"
        @input="debouncedSearch"
        placeholder="Search tours..."
        class="w-full p-2 border rounded"
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
    />
    <!-- add pagination of next /prev -->
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref, watch, onMounted } from "vue";
import axios from "axios";
import { debounce } from "lodash";
import { appConfig } from "~/utils/helpers";
import { useUser } from "~/composables/user";

// Define state and data
const user = useUser();
const token = ref(user.value?.token);
const results: Ref<any[]> = ref([]);
const title = "TravelMate - Discover Your Next Adventure";
const description = "TravelMate offers a wide range of tours to exciting destinations. Explore our available tours, view detailed information, and book your next adventure with ease.";
const perPage = ref(9);
const currentPage = ref(1);
const totalPages = ref(1);
const searchQuery = ref('');

// Function to fetch tours
const fetchTours = async (page: number = 1, search: string = '') => {
  try {
    const config = {
      headers: token.value ? { Authorization: `Bearer ${token.value}` } : {}
    };

    const response = await axios.get(appConfig.api.url(`/api/tours?page=${page}&search=${search}&per_page=${perPage.value}`), config);
    results.value = response.data.results;
    totalPages.value = response.data.results.last_page;
    currentPage.value = page;
  } catch (error) {
    console.error("Error fetching tours:", error);
  }
};

// Watch for changes in the token and fetch data when it changes
watch(
  () => user.value?.token,
  (newToken) => {
    token.value = newToken;
    if (newToken) {
      fetchTours();
    }
  },
  { immediate: true }
);

// Fetch data when component is mounted if token is already available
onMounted(() => {
  if (token.value) {
    fetchTours();
  }
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
