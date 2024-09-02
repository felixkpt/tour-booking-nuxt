<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineEmits } from "vue";
import { subscribe, publish } from "~/components/BaseComponents/utils/pubSub";
import type { RecordType } from "../BaseAutoModel/types";

// Define props
const props = defineProps<{
  modelID: string;
  modelNameSingular: string;
  endpoint: string;
}>();

const record = ref<RecordType | undefined>(undefined);
const showModal = ref(false);
const responseMessage = ref<string | null>(null);
const loading = ref(false);

const handleRecord = ({ record: rec }: { record: RecordType }) => {
  record.value = rec;
  showModal.value = true;
};

const handleDelete = async () => {
  if (record.value) {
    loading.value = true;
    try {
      // Publish delete action
      await publish(`${props.modelID}_submit`, {
        method: "delete",
        action: `${props.endpoint}/view/${record.value.id}`,
      });
    } catch (error) {
      responseMessage.value = "Error deleting record";
    } finally {
      loading.value = false;
    }
  }
};

const handleClose = () => {
  showModal.value = false;
};

const handleResponse = ({ status, data, error }: any) => {
  loading.value = false;
  if (status === 200) {
    setTimeout(() => {
      publish(`${props.modelID}_refresh`, {});
      publish(`${props.modelID}_closeModal`, {});
      handleClose()
    }, 400);
  } else {
    responseMessage.value = "Error updating record";
  }
};

// Subscribe to record updates
onMounted(() => {
  const unsubscribe = subscribe(`${props.modelID}`, handleRecord);
  const unsubscribeResponse = subscribe(
    `${props.modelID}_done`,
    handleResponse
  );

  onUnmounted(() => {
    unsubscribe();
    unsubscribeResponse();
  });
});
</script>

<template>
  <div
    v-if="showModal"
    class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h3 class="text-lg font-bold mb-4">Confirm Delete</h3>
      <p class="mb-4">
        Are you sure you want to delete {{ props.modelNameSingular }}
        {{ record?.id ? `#${record.id}` : "" }}?
      </p>
      <div class="flex justify-end space-x-4">
        <button
          @click="handleDelete"
          :class="`bg-red-500 text-white px-4 py-2 rounded ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`"
          :disabled="loading"
        >
          {{ loading ? "Deleting..." : "Delete" }}
        </button>
        <button
          @click="handleClose"
          class="bg-gray-300 text-gray-800 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
      <div
        v-if="responseMessage"
        class="mt-4 p-3 rounded bg-red-200 text-red-800"
      >
        {{ responseMessage }}
      </div>
    </div>
  </div>
</template>
