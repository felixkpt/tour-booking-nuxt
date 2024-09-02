<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <header class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-bold">{{ title }}</h3>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </header>
      <main class="mb-4">
        <!-- Add slot for custom content -->
        <slot name="body"></slot>

        <!-- Input for maximum available slots -->
        <div class="mt-4">
          <label for="max-slots" class="block text-sm font-medium text-gray-700"
            >Number of Slots</label
          >
          <input
            v-model.number="slots"
            type="number"
            id="max-slots"
            min="1"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </main>
      <footer class="flex justify-end space-x-4">
        <button
          v-if="confirmButtonText"
          @click="confirmAction"
          :class="`bg-blue-500 text-white px-4 py-2 rounded ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`"
          :disabled="loading"
        >
          {{ loading ? "Processing..." : confirmButtonText }}
        </button>
        <button
          @click="$emit('close')"
          class="bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </footer>
      <div
        v-if="responseMessage"
        class="mt-4 p-3 rounded bg-red-200 text-red-800"
      >
        {{ responseMessage }}
      </div>
    </div>
    <AuthUser :isRequired="true" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { appConfig } from "~/utils/helpers";

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  confirmButtonText: {
    type: String,
    default: "Confirm",
  },
  apiEndpoint: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  actionMethod: {
    type: String,
    required: true,
  },
  bodyData: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["close", "doneBooking"]);

const loading = ref(false);
const responseMessage = ref<string | null>(null);
const slots = ref<number>(props.bodyData.slots);

// Watch for changes to maxSlots and update bodyData accordingly
watch(slots, (newMaxSlots) => {
  props.bodyData.slots = newMaxSlots;
});
const confirmAction = async () => {
  loading.value = true;
  responseMessage.value = null;

  try {
    const config = {
      method: props.actionMethod,
      headers: {
        Authorization: `Bearer ${props.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(props.bodyData),
    };

    const response = await fetch(appConfig.api.url(props.apiEndpoint), config);
    const result = await response.json();

    if (!response.ok) {
      // If the response is not OK, set the response message
      responseMessage.value = result.message || "Error processing request";
    } else {
      emit("doneBooking");
    }
  } catch (error) {
    responseMessage.value = "Error processing request";
  } finally {
    loading.value = false;
  }
};
</script>
