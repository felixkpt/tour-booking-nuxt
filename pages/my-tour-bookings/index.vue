<template>
  <div class="mt-3 px-3">
    <h3 class="text-gray-500 dark:text-gray-300 font-bold text-2xl">
      My Tours
    </h3>

    <!-- Booking Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6 mt-4">
      <div
        v-for="booking in bookings"
        :key="booking.id"
        class="bg-light-primary dark:bg-dark-primary shadow-lg rounded-lg p-6"
      >
        <img
          :src="booking.tour.featured_image"
          alt="Tour Image"
          class="w-full h-40 object-cover rounded-md mb-4"
        />
        <h3 class="text-xl font-semibold">{{ booking.tour.name }}</h3>
        <p class="text-sm text-gray-600">Slots Booked: {{ booking.slots }}</p>
        <p class="text-lg font-bold">
          Price: ${{ (booking.slots * booking.tour.price).toFixed(2) }}
        </p>
        <p class="font-thin text-sm text-gray-500 mt-2">
          {{ FormatDate.toLocaleDateString(booking.created_at) }}
        </p>
        <p
          :class="statusClass(booking.status.slug)"
          class="font-medium text-sm"
        >
          {{ booking.status.name }}
        </p>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="flex justify-center">
      <button
        @click="fetchData(currentPage - 1)"
        :disabled="currentPage <= 1"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Previous
      </button>
      <span class="mx-4">{{ currentPage }} / {{ totalPages }}</span>
      <button
        @click="fetchData(currentPage + 1)"
        :disabled="currentPage >= totalPages"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useAuthUser } from "~/composables/user";
import FormatDate from "~/utils/FormatDate";
import { appConfig } from "~/utils/helpers";

const authUser = useAuthUser();
const token = ref(authUser.value?.token);

const bookings = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const pageSize = 15;

const fetchData = async (page: number) => {
  if (!token.value) {
    console.error("Token is not available");
    return;
  }

  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;

  try {
    const response = await fetch(
      appConfig.api.url(
        `/api/tours/bookings?page=${page}&per_page=${pageSize}`
      ),
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    const results = data.results;
    bookings.value = results.data;
    totalPages.value = results.last_page;
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }
};

// Watch for changes in the token and fetch data when it changes
watch(
  () => authUser.value?.token,
  (newToken) => {
    token.value = newToken;
    fetchData(currentPage.value);
  },
  { immediate: true } // Fetch data immediately if token is available
);

function statusClass(statusSlug: string) {
  switch (statusSlug) {
    case "pending":
      return "text-yellow-500";
    case "confirmed":
      return "text-green-500";
    case "completed":
      return "text-blue-500";
    case "cancelled":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}

.bg-white {
  background-color: #ffffff;
}

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}

.rounded-lg {
  border-radius: 12px;
}

.p-6 {
  padding: 24px;
}

.h-40 {
  height: 10rem;
}
</style>
