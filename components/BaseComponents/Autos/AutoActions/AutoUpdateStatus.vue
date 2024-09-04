<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import { publish, subscribe } from "~/components/BaseComponents/utils/pubSub";
import type { HttpVerb } from "~/components/BaseComponents/types";
import type { FillableType } from "../BaseAutoModel/types";

// Define props
const props = defineProps<{
  modelID: string;
  modelNameSingular: string;
  method: HttpVerb;
  endpoint: string;
  fillable: FillableType[];
}>();

const localTitle = ref(`Update Status of ${props.modelNameSingular}`);
const record = ref<any>({ status_id: "" });
const statuses = ref<any>([]);
const responseMessage = ref<string | null>(null);
const loading = ref(false);

// Watch for record changes
watch(
  () => record.value,
  (newRecord) => {
    if (newRecord) {
      localTitle.value = `Update Status of ${props.modelNameSingular} #${newRecord.id}`;
    } else {
      localTitle.value = `Update Status of ${props.modelNameSingular}`;
    }
  }
);

const handleRecord = ({
  record: rec,
  statuses: stats,
}: {
  record: Record<string, string>;
  statuses: any;
}) => {
  record.value = rec;
  statuses.value = stats;
};

const handleResponse = ({ status, data, error }: any) => {
  loading.value = false;
  if (status === 200) {
    setTimeout(() => {
      publish(`${props.modelID}_refresh`, {});
      publish(`${props.modelID}_closeModal`, {});
    }, 400);
  } else {
    responseMessage.value = error?.message || "Error updating record";
  }
};

// Subscribe to events
onMounted(() => {
  const unsubscribeRecord = subscribe(`${props.modelID}`, handleRecord);
  const unsubscribeResponse = subscribe(
    `${props.modelID}_done`,
    handleResponse
  );

  onUnmounted(() => {
    unsubscribeRecord();
    unsubscribeResponse();
  });
});

const handleSubmit = (e: Event) => {
  e.preventDefault();
  loading.value = true;
  publish(`${props.modelID}_submit`, {
    method: "patch",
    action: `${props.endpoint}/view/${record.value.id}/update-status`,
    formData: { status_id: record.value.status_id },
  });
};
</script>

<template>
  <div>
    <div class="border-b-2 border-b-gray-400 mb-5">
      <h3 class="text-gray-500 dark:text-gray-300 font-bold text-2xl">
        {{ localTitle }}
      </h3>
    </div>
    <form @submit="handleSubmit">
      <div class="my-3">
        <div v-if="responseMessage" class="p-3 rounded bg-red-200 text-red-800">
          {{ responseMessage }}
        </div>
      </div>
      <div class="my-3">
        <label for="status" class="block text-sm font-medium text-gray-700"
          >Pick a Status</label
        >
        <select
          id="status"
          v-model="record.status_id"
          class="shadow appearance-none border rounded w-full py-2 px-3 bg-light-primary dark:bg-dark-primary text-dark-primary dark:text-light-primary leading-tight focus:outline-none focus:shadow-outline"
        >
          <option
            v-for="status in statuses"
            :key="status.id"
            :value="status.id"
          >
            {{ status.name }}
          </option>
        </select>
      </div>
      <div class="flex justify-end">
        <button
          :class="`bg-blue-500 text-white px-4 py-2 rounded ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`"
          :disabled="loading"
        >
          {{ loading ? "Updating status..." : "Update status" }}
        </button>
      </div>
    </form>
  </div>
</template>
