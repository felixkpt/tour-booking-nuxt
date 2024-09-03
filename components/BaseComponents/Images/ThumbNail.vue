<template>
  <span class="block overflow-hidden rounded shadow w-[40px] h-[40px]">
    <img
      :src="imageSrc"
      alt="Featured Image"
      class="w-full h-full object-cover"
    />
  </span>
</template>
<script setup lang="ts">
import { computed, defineProps } from "vue";

const props = defineProps<{
  row: {
    featured_image: string | null;
  };
}>();

const imageSrc = computed(() => props.row.featured_image || "-");
</script>
