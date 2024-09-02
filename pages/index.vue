<template>
  <ToursList 
    :key="results" 
    :results="results" 
    :title="title" 
    :description="description" 
    :fetchPage="fetchPage"
    :currentPage="currentPage"
    :totalPages="totalPages"
  />
</template>

<script setup lang="ts">
import { ref, type Ref, watch, onMounted } from "vue";
import axios from "axios";
import { appConfig } from "~/utils/helpers";
import { useUser } from "~/composables/user";

// Define state and data
const user = useUser();
const token = ref(user.value?.token); // Use ref to make token reactive

const results: Ref<any[]> = ref([]);
const title = "TravelMate - Discover Your Next Adventure";
const description = "TravelMate offers a wide range of tours to exciting destinations. Explore our available tours, view detailed information, and book your next adventure with ease.";
const currentPage = ref(1);
const totalPages = ref(1);

// Function to fetch tours
const fetchTours = async (page: number = 1) => {
  try {
    const config = {
      headers: token.value ? { Authorization: `Bearer ${token.value}` } : {}
    };

    const response = await axios.get(appConfig.api.url(`/api/tours?page=${page}`), config);
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
  { immediate: true } // Fetch data immediately on component mount if token is available
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
    fetchTours(page);
  }
}

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
