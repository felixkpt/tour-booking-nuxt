<template></template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { publish, subscribe } from "~/components/BaseComponents/utils/pubSub";
import { autoRequest } from "../utils/autoRequest";
import { useAuthUser } from "~/composables/useAuthUser";

const props = defineProps({
  modelID: String,
});

const handleSubmit = async ({ action, method, formData }: any) => {
  // Retrieve the user object, which includes the token
  const authUser = useAuthUser();
  const token = authUser.value?.token

  try {
    const response = await autoRequest(action, method, formData, token);

    publish(`${props.modelID}_done`, {
      status: response.status,
      data: response.data,
      error: response.error,
      modelID: props.modelID,
    });
  } catch (error) {
    const errorMessage = (error as Error).message || "Internal Server Error";

    publish(`${props.modelID}_done`, {
      status: 500,
      error: errorMessage,
      modelID: props.modelID,
    });
  }
};

onMounted(() => {
  const unsubscribe = subscribe(`${props.modelID}_submit`, handleSubmit);

  onUnmounted(() => {
    unsubscribe();
  });
});
</script>
