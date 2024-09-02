<template>
  <div>
    <BaseComponentsAutosAutoPost :modelID="`${props.modelID}_CreateOrUpdate`" />
    <BaseComponentsAutosAutoPost :modelID="`${props.modelID}_UpdateStatus`" />
    <BaseComponentsAutosAutoPost :modelID="`${props.modelID}_Archive`" />
    <BaseComponentsAutosAutoPost :modelID="`${props.modelID}_Delete`" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  modelID: string;
}>();
</script>
