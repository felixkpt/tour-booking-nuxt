<template></template>

<script setup lang="ts">
import { publish } from "~/components/BaseComponents/utils/pubSub";

// Props definition
const props = defineProps<{
  modelID: string;
  headers: string[];
  statuses: any[];
  record: any;
  method: string;
}>();

// Actions
const viewRecord = async (rec: any) => {
  publish(`${props.modelID}_View`, { record: rec, headers: props.headers });
};

const createRecord = async (rec: any) => {
  publish(`${props.modelID}_CreateOrUpdate`, { record: rec });
};

const editRecord = async (rec: any) => {
  publish(`${props.modelID}_CreateOrUpdate`, { record: rec });
};

const updateStatus = async (rec: any) => {
  publish(`${props.modelID}_UpdateStatus`, {
    record: rec,
    statuses: props.statuses,
  });
};

const deleteRecord = async (rec: any) => {
  publish(`${props.modelID}_Delete`, { record: rec });
};

defineExpose({
  viewRecord,
  createRecord,
  editRecord,
  updateStatus,
  deleteRecord,
});
</script>
