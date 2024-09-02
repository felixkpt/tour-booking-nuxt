<template>
  <div>
    <ToursTour :key="tour" :tour="tour" @bookTour="showConfirmModal" />

    <!-- Confirmation Modal -->
    <Modal
      v-if="showModal"
      :show="showModal"
      title="Confirm Booking"
      confirmButtonText="Book Now"
      apiEndpoint="/api/tours/bookings"
      actionMethod="POST"
      :token="token"
      :bodyData="{ tour_id: tourId, maxSlots: tour?.slots, slots: 1 }"
      @close="showModal = false"
      @doneBooking="handleBooking"
    >
      <p>Are you sure you want to book this tour?</p>
    </Modal>

    <!-- Booking Indicator -->
    <div
      v-if="isBooking"
      class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-4 rounded shadow-md text-center">
        <p>Booking in progress...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useUser } from "~/composables/user";
import type { TourType } from "~/types/tours";
import { appConfig } from "~/utils/helpers";

// State to hold the tour data
const tour = ref<TourType | null>(null);

// State for modal visibility and booking indicator
const showModal = ref(false);
const isBooking = ref(false);

// Get the route parameter
const route = useRoute();
const tourId = route.params.id;

// Get user token
const user = useUser();
const token = ref(user.value?.token); // Make token reactive

// Function to fetch the tour data from the backend
const fetchTour = async () => {
  try {
    const config = {
      headers: token.value ? { Authorization: `Bearer ${token.value}` } : {},
    };
    const response = await fetch(
      appConfig.api.url(`/api/tours/view/${tourId}`),
      config
    );
    const data = await response.json();
    tour.value = data?.results;
  } catch (error) {
    console.error("Failed to fetch tour:", error);
  }
};

// Watch for changes in the token and fetch data when it changes
watch(
  () => user.value?.token,
  (newToken) => {
    token.value = newToken;
    fetchTour();
  },
  { immediate: true } // Fetch data immediately if token is available
);

// Show confirmation modal
const showConfirmModal = () => {
  showModal.value = true;
};

// Handle booking
const handleBooking = async () => {
  showModal.value = false;
  fetchTour()
};
</script>
