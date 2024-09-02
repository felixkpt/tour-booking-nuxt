<template>
  <div>
    <select
      :id="props.name"
      :name="`${props.name}${props.multiple ? '[]' : ''}`"
      v-model="selectedOption"
      @change="handleChange"
      @input="handleInputChange"
      :class="{ 'border-red-700': errors[props.name] }"
      class="shadow appearance-none border rounded w-full py-2 px-3 bg-light-primary dark:bg-dark-primary text-dark-primary dark:text-light-primary leading-tight focus:outline-none focus:shadow-outline"
      :multiple="props.multiple"
      aria-label="Field label"
    >
      <option v-for="option in options" :key="option.id" :value="option.id">
        {{
          option.name ||
          `#${option.id}${
            option?.created_at ? " (" + FormatDate.toLocaleDateString(option.created_at) + ")" : ""
          }`
        }}
      </option>
    </select>
    <p v-if="errors[props.name]" class="text-red-700 text-sm mt-1">
      {{ errors[props.name] }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import fetchOptions from "~/utils/fetchOptions";
import throttle from "~/utils/throttle";
import { formatEvent } from "./helpers";
import FormatDate from "~/utils/FormatDate";
import { useUser } from "~/composables/user";
import type { ServerModelOptionType } from "~/types";

const props = defineProps<{
  modelID: string;
  name: string;
  serverModelOptions: ServerModelOptionType;
  value?: string | string[];
  onChange: (e: any) => void;
  dropdownSource: string;
  multiple?: boolean;
  size?: "small" | "medium";
  record?: Record<string, any> | null;
}>();

const emit = defineEmits<{
  (event: "inputChange", value: string | string[]): void;
}>();

const options = ref<any[]>([]);
const selectedOption = ref<string | string[] | null>(
  props.multiple ? [] : null
);
const loading = ref<boolean>(false);
const ensuredRecord = ref<string | undefined>();
const timeoutRef = ref<number | null>(null);
const errors = ref<Record<string, string>>({});

const user = useUser();
const token = user.value?.token;

const setInitialRecords = async () => {
  loading.value = true;
  const exists = props.serverModelOptions
    ? props.serverModelOptions[props.dropdownSource]
    : undefined;
  if (exists) {
    options.value = exists.records || [];
  } else {
    try {
      const data = await fetchOptions(props.dropdownSource, {}, token);
      options.value = data.results.data || [];
    } catch (error: any) {
      // Handle error
    }
  }
  loading.value = false;
};

const fetchOptionsThrottled = throttle(async (searchTerm: string) => {
  loading.value = true;
  try {
    const data = await fetchOptions(
      props.dropdownSource,
      { search: searchTerm },
      token
    );
    options.value = data.results.data || [];
  } catch (error: any) {
    // Handle error
  }
  loading.value = false;
}, 300);

const handleInputChange = (event: Event) => {
  if (!event.isTrusted) return; // Ensure the event is trusted

  const target = event.target as HTMLSelectElement;
  let newInputValue: string | string[];

  if (props.multiple) {
    newInputValue = Array.from(
      target.selectedOptions,
      (option) => option.value
    );
  } else {
    newInputValue = target.value;
    // console.log("newInputValue:",newInputValue)
  }

  setTimeout(() => {
    // emit("inputChange", newInputValue);
  }, 800);

  if (typeof newInputValue === "string" && newInputValue.trim() !== "") {
    fetchOptionsThrottled(newInputValue);
  } else {
    setInitialRecords();
  }
};

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  let newValue: string | string[];

  if (props.multiple) {
    newValue = Array.from(target.selectedOptions, (option) => option.value);
  } else {
    // console.log("Straight value:",target.value)
    newValue = target.value;
  }

  selectedOption.value = newValue;
  delayOnChange(formatEvent(props.name, newValue));
};

const ensureCurrentRecordIsSelected = async () => {
  // console.log("Options value:", options.value);

  if (options.value.length > 0 && props.record && props.value) {
    // console.log("Passed value:", props.value);

    // Skip if the record is already ensured
    if (ensuredRecord.value === String(props.record.id)) return;

    // Handle multiple selection
    if (props.multiple && Array.isArray(props.value)) {
      const ids = props.value.map((role: any) => role.id);
      selectedOption.value = ids;

      delayOnChange(formatEvent(props.name, props.value));
    } else {
      // Handle single selection
      const exists = options.value.find(
        (itm) => String(itm.id) === String(props.value)
      );

      if (exists) {
        selectedOption.value = exists.id;
        delayOnChange(formatEvent(props.name, exists.id));
      } else {
        loading.value = true;
        try {
          const data = await fetchOptions(
            props.dropdownSource,
            {
              id: props.value,
            },
            token
          );
          const records = data.results.data || [];
          options.value = [...records, ...options.value];

          const current = records.find(
            (itm: any) => String(itm.id) === String(props.value)
          );

          if (current) {
            selectedOption.value = current.id;
            delayOnChange(formatEvent(props.name, current.id));
          }
        } catch (error: any) {
          console.error("Error fetching options:", error);
        }
        loading.value = false;
      }
    }

    // Mark the current record as ensured
    ensuredRecord.value = String(props.record.id);
  }
};

const delayOnChange = (eventData: any) => {
  if (timeoutRef.value) {
    clearTimeout(timeoutRef.value);
  }
  timeoutRef.value = window.setTimeout(() => {
    props.onChange(eventData);
  }, 600);
};

watch(
  () => [props.serverModelOptions, props.dropdownSource],
  () => {
    setInitialRecords();
  }
);

watch(
  () => [options.value, props.record],
  () => {
    ensureCurrentRecordIsSelected();
  },
  { immediate: true }
);

onMounted(() => {
  setInitialRecords();
});
</script>
