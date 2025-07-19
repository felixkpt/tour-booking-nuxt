<template>
  <div>
    <DestinationsView :key="destination" :destination="destination" @bookTour="showConfirmModal" />

    <!-- Confirmation Modal -->
    <Modal
      v-if="showModal"
      :show="showModal"
      title="Confirm Booking"
      confirmButtonText="Book Now"
      apiEndpoint="/api/tours/bookings"
      actionMethod="POST"
      :bodyData="{
        tour_id: destinationId,
        maxSlots: destination?.slots,
        slots: 1,
      }"
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
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import type { TourType } from "~/types/tours";
import { useApi } from "../../../../composables/useApi";

// State to hold the tour data
const destination = ref<TourType | null>(null);

// State for modal visibility and booking indicator
const showModal = ref(false);
const isBooking = ref(false);

// Get the route parameter
const route = useRoute();
const destinationId = route.params.id;


const { get } = useApi();
interface TourApiResponse {
  results: TourType;
  [key: string]: any;
}

const fetchTour = async () => {
  try {
    const response = await get(`/api/destinations/view/${destinationId}`);
    const res = await response as TourApiResponse;
    destination.value = res?.results;
  } catch (error) {
    console.error("Failed to fetch destination:", error);
  }
};

onMounted(async () => {
  fetchTour();
});

// Show confirmation modal
const showConfirmModal = () => {
  showModal.value = true;
};

// Handle booking
const handleBooking = async () => {
  showModal.value = false;
  fetchTour();
};
</script>
