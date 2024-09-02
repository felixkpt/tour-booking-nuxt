<script setup lang="ts">
import { computed } from "vue";
import type { HeaderType, RecordType } from "./BaseAutoModel/types";

// Define props
const props = defineProps<{
  headers: HeaderType[];
  record: RecordType | undefined;
  modelID: string;
  AutoTableHeaderActions?: any;
  isFromAutoView?: boolean;
}>();

// Computed property for the table component ID
const tableComponentId = computed(() => `${props.modelID}AutoTable`);

// Computed property to check for the 'action' header
const actionHeader = computed(
  () =>
    !props.isFromAutoView &&
    props.headers.find((header) => header.key === "action")
);

</script>

<template>
  <div :id="tableComponentId" class="autotableWrapper p-4 dark:bg-dark-primary bg-light-primary">
    <table class="table-auto w-full border-collapse">
      <!-- Display the action header if it exists and is not from AutoView -->
      <thead v-if="actionHeader">
        <tr>
          <td
            :class="`${tableComponentId} data-${actionHeader.key} p-2 border-b dark:border-dark-border-default border-light-border-default text-right`"
            colspan="2"
          >
            <div class="w-full flex justify-end dark:text-dark-text text-light-text">
              {{ props.record && props.record[actionHeader.key] }}
            </div>
          </td>
        </tr>
      </thead>

      <!-- Display the table body -->
      <tbody>
        <tr
          v-for="(column, index) in (props.headers ? props.headers : []).filter(header => header.key !== 'action')"
          :key="index"
          :class="`${tableComponentId} row-${column.key} dark:text-dark-text text-light-text`"
        >
          <td :class="`${tableComponentId} heading-${column.key} p-2 border-b dark:border-dark-border-default border-light-border-default`">
            {{ column.label || column.key }}
          </td>
          <td :class="`${tableComponentId} data-${column.key} p-2 border-b dark:border-dark-border-default border-light-border-default font-semibold`">
            <span v-if="column.renderCell" v-html="column.renderCell(props.record, column.key)"></span>
            <span v-else>{{ props.record && props.record[column.key] }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
