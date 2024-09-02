<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { subscribe } from "~/components/BaseComponents/utils/pubSub";
import type { FillableType, HeaderType } from "../BaseAutoModel/types";

// Define props
const props = defineProps<{
  modelID: string;
  modelNameSingular: string;
  method: string;
  endpoint: string;
  fillable: FillableType[];
}>();

// Reactive state variables
const localTitle = ref(`Viewing ${props.modelNameSingular}`);
const record = ref<Record<string, string> | null>(null);
const headers = ref<HeaderType[] | null>(null);

// Watch for changes in the record to update the title
watch(record, (newRecord) => {
  if (newRecord) {
    localTitle.value = `Viewing ${props.modelNameSingular} #${newRecord.id}`;
  } else {
    localTitle.value = `Viewing ${props.modelNameSingular}`;
  }
});

// Subscribe to events and handle record updates
onMounted(() => {
  const handleRecord = ({
    record: newRecord,
    headers: newHeaders,
  }: {
    record: Record<string, string>;
    headers: HeaderType[];
  }) => {
    record.value = newRecord;
    headers.value = newHeaders;
    console.log("handleRecord:", props.method);
  };

  // Subscribe to the record event
  const unsubscribe = subscribe(`${props.modelID}`, handleRecord);

  // Unsubscribe when the component is unmounted
  onUnmounted(() => {
    unsubscribe();
  });
});
</script>

<template>
  <div>
    <!-- Title with dynamic content -->
    <div class="border-b-2 border-b-gray-400 mb-5">
      <h3 class="text-gray-500 dark:text-gray-300 font-bold text-2xl">
        {{ localTitle }}
      </h3>
    </div>

    <!-- AutoTableSingle component to display the record -->
    <BaseComponentsAutosAutoTableSingle
      :record="record"
      :headers="headers"
      :modelID="props.modelID"
      :isFromAutoView="true"
      :key="record"
    />
  </div>
</template>
