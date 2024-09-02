<template>
  <FormControl :fullWidth="true" variant="outlined" margin="normal" :size="size">
    <Autocomplete
      v-model="selectedOption"
      :options="options"
      :get-option-label="getOptionLabel"
      @change="handleChange"
      @input-change="handleInputChange"
      filter-options="filterOptions"
      :render-input="renderInput"
    />
    <FormHelperText v-if="error" error>{{ error }}</FormHelperText>
  </FormControl>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import fetchOptions from '~/utils/fetchOptions';
import throttle from '~/utils/throttle';
import { formatEvent } from './helpers';
import useDropdownDependenciesListeners from './useDropdownDependenciesListener';

type Props = {
  modelID: string;
  name: string;
  value?: string;
  onChange: (e: any) => void;
  dropdownSource: string;
  dropdownDependsOn: string[] | null;
  size?: 'small' | 'medium';
  record?: Record<string, any> | null;
};

const props = defineProps<Props>();

const options = ref<any[]>([]);
const selectedOption = ref<any>(null);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);
const dependencies = ref<Record<string, string>>({});
const ensuredRecord = ref<string | undefined>();
const timeoutRef = ref<number | null>(null);

const fetchOptionsThrottled = throttle(async (searchTerm: string) => {
  loading.value = true;
  try {
    const data = await fetchOptions(props.dropdownSource, { ...dependencies.value, search: searchTerm });
    options.value = data.records || [];
  } catch (error: any) {
    error.value = error.message || 'An error occurred while fetching options.';
  } finally {
    loading.value = false;
  }
}, 300);

const setInitialRecords = async () => {
  loading.value = true;
  try {
    const queryParams = { ...dependencies.value, per_page: 50 };
    const data = await fetchOptions(props.dropdownSource, queryParams);
    const records = data.records || [];
    options.value = [...records];
    if (selectedOption.value) {
      const current = records.find((itm: any) => itm.id == selectedOption.value.id);
      if (current) {
        selectedOption.value = current;
        delayOnChange(formatEvent(props.name, current));
      } else {
        selectedOption.value = null;
      }
    }
  } catch (error: any) {
    error.value = error.message || 'An error occurred while fetching options.';
  } finally {
    loading.value = false;
  }
};

const dependenciesHandler = (newValue: Record<string, string>) => {
  dependencies.value = { ...dependencies.value, ...newValue };
};

useDropdownDependenciesListeners(props.modelID, props.dropdownSource, props.dropdownDependsOn, dependenciesHandler);

const handleChange = (event: any, newValue: any) => {
  selectedOption.value = newValue;
  if (newValue) {
    delayOnChange(formatEvent(props.name, newValue));
  }
};

const handleInputChange = (event: any, newInputValue: string) => {
  if (event && event.isTrusted) {
    const inputExistsInOptions = options.value.some(option => option.name === newInputValue);
    if (newInputValue.trim() !== '' && !inputExistsInOptions) {
      fetchOptionsThrottled(newInputValue);
    }
  }
};

const ensureCurrentRecordIsSelected = async () => {
  if (props.record && props.value) {
    if (ensuredRecord.value === String(props.record.id)) return;

    const exists = options.value.find((itm) => String(itm.id) === String(props.record[props.name]));
    if (exists) {
      selectedOption.value = exists;
      delayOnChange(formatEvent(props.name, exists));
    } else {
      loading.value = true;
      try {
        const data = await fetchOptions(props.dropdownSource, { ...dependencies.value, id: props.record[props.name] });
        const records = data.records || [];
        options.value = [...records, ...options.value];
        const current = records.find((itm: any) => itm.id == props.record[props.name]);
        if (current) {
          selectedOption.value = current;
          delayOnChange(formatEvent(props.name, current));
        }
      } catch (error: any) {
        // Handle error
      }
      loading.value = false;
    }

    ensuredRecord.value = String(props.record.id);
  }
};

const delayOnChange = (eventData: any) => {
  if (timeoutRef.value) {
    clearTimeout(timeoutRef.value);
  }
  timeoutRef.value = window.setTimeout(() => {
    props.onChange(eventData);
  }, 250);
};

const getOptionLabel = (option: any) => option.name || '';

const renderInput = (params: any) => (
  `<TextField {...params} label="Select..." variant="outlined" />`
);

const filterOptions = (options: any[]) => options;

watch(() => [options.value, props.record], () => {
  ensureCurrentRecordIsSelected();
}, { immediate: true });

onMounted(() => {
  setInitialRecords();
});
</script>
