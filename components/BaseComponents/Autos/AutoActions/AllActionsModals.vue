<template>
  <div>
    <!-- Modal for creating or updating a record -->
    <BaseComponentsAutosAutoModal
      :modelID="`${modelID}_CreateOrUpdate`"
      :title="modelNameSingular"
    >
      <BaseComponentsAutosAutoActionsAutoCreateOrUpdateRecord
        :modelID="`${modelID}_CreateOrUpdate`"
        :modelNameSingular="modelNameSingular"
        method="POST"
        :endpoint="apiEndpoint"
        :fillable="fillableFieldsFiltered"
        :serverModelOptions="serverModelOptions"
      />
    </BaseComponentsAutosAutoModal>

    <!-- Modal for viewing a record -->
    <BaseComponentsAutosAutoModal
      :modelID="`${modelID}_View`"
      :title="modelNameSingular"
    >
      <BaseComponentsAutosAutoActionsAutoViewRecord
        :modelID="`${modelID}_View`"
        :modelNameSingular="modelNameSingular"
        method="GET"
        :endpoint="apiEndpoint.trim().replace(/\/$/, '')"
        :fillable="fillableFieldsFiltered"
      />
    </BaseComponentsAutosAutoModal>

    <!-- Modal for updating the status of a record -->
    <BaseComponentsAutosAutoModal
      :modelID="`${modelID}_UpdateStatus`"
      :title="modelNameSingular"
    >
      <BaseComponentsAutosAutoActionsAutoUpdateStatus
        :modelID="`${modelID}_UpdateStatus`"
        :modelNameSingular="modelNameSingular"
        method="GET"
        :endpoint="apiEndpoint.trim().replace(/\/$/, '')"
        :fillable="fillableFieldsFiltered"
      />
    </BaseComponentsAutosAutoModal>

    <!-- Modal for archiving a record -->
    <BaseComponentsAutosAutoModal
      :modelID="`${modelID}_Archive`"
      :title="modelNameSingular"
    >
      <AutoArchiveRecord
        :modelID="`${modelID}_Archive`"
        :modelNameSingular="modelNameSingular"
        method="POST"
        :endpoint="apiEndpoint.trim().replace(/\/$/, '')"
        :fillable="fillableFieldsFiltered"
      />
    </BaseComponentsAutosAutoModal>

    <!-- Modal for deleting a record -->
    <BaseComponentsAutosAutoActionsAutoDeleteRecord
      :modelID="`${modelID}_Delete`"
      :modelNameSingular="modelNameSingular"
      method="DELETE"
      :endpoint="apiEndpoint.trim().replace(/\/$/, '')"
      :fillable="fillableFieldsFiltered"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";

import type { FillableType } from "../BaseAutoModel/types";
import type { ServerModelOptionType } from "../../types";
import { publish, subscribe } from "../../utils/pubSub";

// Define props for the component
const props = defineProps<{
  modelID: string; // Unique identifier for the model
  modelNameSingular: string; // Singular name of the model
  apiEndpoint: string; // API endpoint for the model's CRUD operations
  fillableFields: FillableType[]; // Fields that can be filled/modified
  serverModelOptions: ServerModelOptionType; // Options for server-side models
}>();

// Filtered list of fillable fields (if any filtering logic is needed)
const fillableFieldsFiltered = computed(() => props.fillableFields);

console.log('fillableFieldsFiltered::::',fillableFieldsFiltered.value)
onMounted(() => {
  // Subscribe to the refresh event for creating/updating a record
  subscribe(`${props.modelID}_CreateOrUpdate_refresh`, () => {
    publish(`${props.modelID}_refresh`, {}); // Trigger a refresh for the model
  });

  // Subscribe to the refresh event for updating the status of a record
  subscribe(`${props.modelID}_UpdateStatus_refresh`, () => {
    publish(`${props.modelID}_refresh`, {}); // Trigger a refresh for the model
  });

  // Subscribe to the refresh event for archiving a record
  subscribe(`${props.modelID}_Archive_refresh`, () => {
    publish(`${props.modelID}_refresh`, {}); // Trigger a refresh for the model
  });

  // Subscribe to the refresh event for deleting a record
  subscribe(`${props.modelID}_Delete_refresh`, () => {
    publish(`${props.modelID}_refresh`, {}); // Trigger a refresh for the model
  });
});
</script>
