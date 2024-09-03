<template>
  <div>
    <div class="flex justify-between mb-2">
      <h3 class="text-gray-500 dark:text-gray-300 font-bold text-2xl">
        {{ `${modelNamePlural ? modelNamePlural + " list" : ""}` }}
      </h3>
      <button
        @click="() => actionHandlers.createRecord()"
        class="btn btn-primary"
      >
        {{ `Create ${modelNameSingular || "Record"}` }}
      </button>
    </div>
    <BaseComponentsAutosAutoTable
      :headers="headers"
      :api-url="apiUrl"
      :actions="[
          { label: 'View', callback: (rec:any) => actionHandlers.viewRecord(rec) },
          { label: 'Edit', callback: (rec:any) => actionHandlers.editRecord(rec) },
          {
            label: 'Update Status',
            callback: (rec:any) => actionHandlers.updateStatus(rec),
          },
          {
            label: 'Delete',
            callback: (rec:any) => actionHandlers.deleteRecord(rec),
          },
        ]"
      actions-mode="dropdown"
      @setModelDetails="setModelDetails"
      :reloadKey="autoTableReloadKey"
    />
    <BaseComponentsAutosAutoActionsAllActionsModals
      :modelID="modelID"
      :modelNameSingular="modelNameSingular"
      :apiEndpoint="apiUrl"
      :fillableFields="fillable"
      :serverModelOptions="serverModelOptions"
      :key="fillable"
    />
    <BaseComponentsAutosAutoActionsAllActionsAutoPosts :modelID="modelID" />
    <BaseComponentsAutosAutoActionsActionHandlers
      :modelID="modelID"
      :headers="headers"
      :statuses="statuses"
      :record="record"
      :method="method"
      ref="actionHandlers"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { v4 as uuidv4 } from "uuid";
import { onMounted } from "vue";
import { subscribe } from "~/components/BaseComponents/utils/pubSub";

// Generate unique modelID
const modelID = ref(uuidv4());

const apiUrl = ref("/api/admin/destinations");

const headers = [
  { key: "id", label: "ID", renderCell: (row: any) => `#${row.id}` },
  { key: "name", label: "Name" },
  { key: "featured_image", label: "featured_image" },
  { key: "description", label: "description" },
  { key: "creator.name", label: "Created By" },
  { key: "status.name", label: "Status" },
];

const key = ref(0);
const autoTableReloadKey = ref(0);
const modelNameSingular = ref("Destination");
const modelNamePlural = ref("Destinations");
const modelDetails = ref<any>(null);
const fillable = ref<any>(null);
const statuses = ref<any>([]);
const serverModelOptions = ref<any>(null);
const method = ref("post");
const record = ref<any>(null);
const actionHandlers = ref<any>(null);

function setModelDetails(details: any) {
  modelDetails.value = details;
}

watch(modelDetails, (newDetails) => {
  if (newDetails) {
    fillable.value = newDetails.fillable || {};
    modelNameSingular.value = newDetails.model_name;
    modelNamePlural.value = newDetails.model_name_plural;
    statuses.value = newDetails.statuses;
    key.value = key.value + 1;
  }
});

onMounted(() => {
  subscribe(`${modelID.value}_refresh`, () => {
    autoTableReloadKey.value = autoTableReloadKey.value + 1;
  });
});

definePageMeta({
  layout: "admin",
});
</script>
