<template>
  <div>
    <div class="border-b-2 border-b-gray-400 mb-5">
      <h3 class="text-gray-500 dark:text-gray-300 font-bold text-2xl">
        {{ localTitle }}
      </h3>
    </div>

    <p v-if="generalError" class="text-red-700 my-1">{{ generalError }}</p>

    <div :key="key">
      <form method="post" @submit.prevent="handleSubmit">
        <div v-if="formData && Object.keys(formData).length > 0">
          <div v-for="(field, name) in fillable" :key="name" class="mb-4">
            <label
              :for="name"
              class="text-gray-500 dark:text-gray-300 block text-sm font-bold mb-2"
            >
              {{ field.label || name }}:
            </label>
            <input
              v-if="field.input === 'input' && field.type === 'text'"
              :type="field.type"
              :id="name"
              :name="name"
              v-model="formData[name]"
              @change="handleChange"
              aria-label="field.label"
              :class="[
                'shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
                { 'border-red-700': errors[name] },
              ]"
            />
            <input
              v-if="field.input === 'input' && field.type === 'email'"
              :type="field.type"
              :id="name"
              :name="name"
              v-model="formData[name]"
              @change="handleChange"
              aria-label="field.label"
              :class="[
                'shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
                { 'border-red-700': errors[name] },
              ]"
            />
            <input
              v-if="field.input === 'input' && field.type === 'password'"
              :type="field.type"
              :id="name"
              :name="name"
              v-model="formData[name]"
              @change="handleChange"
              aria-label="field.label"
              :class="[
                'shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
                { 'border-red-700': errors[name] },
              ]"
            />
            <input
              v-if="field.input === 'input' && field.type === 'file'"
              :type="field.type"
              :id="name"
              :name="name"
              @change="handleChangeFile"
              aria-label="field.label"
              :class="[
                'shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
                { 'border-red-700': errors[name] },
              ]"
            />
            <input
              v-if="field.input === 'input' && field.type === 'datetime-local'"
              :type="`text`"
              :id="name"
              :name="name"
              v-model="formData[name]"
              @change="handleChange"
              aria-label="field.label"
              :class="[
                'shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
                { 'border-red-700': errors[name] },
              ]"
            />
            <input
              v-if="field.input === 'input' && field.type === 'number'"
              :type="field.type"
              :id="name"
              :name="name"
              v-model="formData[name]"
              @change="handleChange"
              :min="field.min"
              :max="field.max"
              aria-label="field.label"
              :class="[
                'shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
                { 'border-red-700': errors[name] },
              ]"
            />
            <!-- Handling textarea -->
            <textarea
              v-if="field.input === 'textarea'"
              :id="name"
              :name="name"
              v-model="formData[name]"
              @change="handleChange"
              :rows="field.rows || 4"
              :class="[
                'shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
                { 'border-red-700': errors[name] },
              ]"
            ></textarea>

            <BaseComponentsAutosAutoActionsDropdownsDynamicDropdown
              v-if="field.input === 'dropdown'"
              :modelID="modelID"
              :serverModelOptions="
                serverModelOptions ? serverModelOptions[name] : []
              "
              :dropdownSource="field.dropdownSource"
              @inputChange="handleInputChange"
              v-model="formData[name]"
              @change="handleChange"
              :loading="loading"
              :size="field.size"
              :name="name"
              :value="formData[name]"
              :record="record"
              :multiple="field.type === 'multiple'"
            />
            <input
              v-if="field.input === 'input' && field.type === 'checkbox'"
              type="checkbox"
              :id="name"
              :name="name"
              v-model="formData[name]"
              @change="handleChange"
              aria-label="field.label"
              class="ml-2"
            />
            <p v-if="errors[name]" class="text-red-700 text-sm mt-1">
              {{ errors[name] }}
            </p>
          </div>
        </div>
        <div v-else>Setting model details...</div>
        <BaseComponentsButtonsSubmitButton
          :title="'Submit'"
          :loading="loading"
        />
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted, nextTick, computed } from "vue";
import { publish, subscribe } from "~/components/BaseComponents/utils/pubSub";
import { formatErrors } from "../../utils/formatErrors";
import type { HttpVerb, ServerModelOptionType } from "~/types";
import type { FillableType } from "../BaseAutoModel/types";
import { useRoute } from "vue-router";

const props = defineProps({
  modelID: String,
  modelNameSingular: String,
  method: String as () => HttpVerb,
  endpoint: String,
  fillable: Object as () => FillableType[],
  serverModelOptions: Object as () => ServerModelOptionType,
});

const key = ref(0);
const formData = ref<Record<string, any> | null>(null);
const loading = ref(false);
const errors = ref<Record<string, string | null>>({});
const generalError = ref<string | null>(null);
const route = useRoute();

const record = ref<Record<string, any> | null>(null);
const method = ref<string>("post");

const localTitle = computed(() =>
  record.value
    ? `Edit ${props.modelNameSingular} #${record.value.id}`
    : `Create a ${props.modelNameSingular}`
);

const setInitialFormValues = () => {
  if (!props.fillable || Object.keys(props.fillable).length === 0) {
    formData.value = {};
    return;
  }

  const formDat = Object.keys(props.fillable).reduce(
    (acc: Record<string, string | undefined>, name) => {
      const field = props.fillable[name];
      const recordVal = record.value
        ? record.value[name] || record.value[name.split("_list")[0]]
        : null;
      const value = recordVal || field?.value;
      acc[name] = (route.query[name] as string | undefined) || value;
      return acc;
    },
    {}
  );

  nextTick(() => key.value++);
  nextTick(() => (formData.value = formDat));
};

interface InputChangePayload {
  value: string;
  name: string;
}

const handleInputChange = (payload: InputChangePayload) => {
  if (formData.value) {
    formData.value = { ...formData.value, [payload.name]: payload.value };
  }
  // Handle field change
};

const handleChange = (e: Event) => {
  const target = e.target as unknown as any;
  const name = target.name;
  const value = target.type === "checkbox" ? target.checked : target.value;

  formData.value = { ...formData.value, [name]: value };
  errors.value = { ...errors.value, [name]: null };

  const field = props.fillable[name];
  if (field?.onChangeUpdateList) {
    field.onChangeUpdateList.forEach((updateField) => {
      publish(`${props.modelID}_update_${updateField}`, {
        [field.name]: value,
      });
    });
  }
};

const handleChangeFile = (e: Event) => {
  const target = e.target as unknown as any;
  const name = target.name;
  const file = target.files ? target.files[0] : null;

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      formData.value = { ...formData.value, [name]: reader.result as string };
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmit = () => {
  loading.value = true;
  generalError.value = null;
  errors.value = {};

  publish(`${props.modelID}_submit`, {
    method: method.value,
    action: record.value
      ? `${props.endpoint}/view/${record.value.id}`
      : props.endpoint,
    formData: formData.value,
    modelID: props.modelID,
  });
};

const handleResponse = ({ status, data, error }: any) => {
  loading.value = false;
  if (status === 200) {
    resetForm();
    generalError.value = data.message || "Action was successful.";
    publish(`${props.modelID}_refresh`, {});
    publish(`${props.modelID}_closeModal`, {});
  } else {
    handleError(error);
  }
};

const resetForm = () => {
  setInitialFormValues();
  method.value = "post";
};

const handleError = (error: any) => {
  if (typeof error === "string") {
    generalError.value = error;
  } else if (typeof error === "object") {
    if (error.errors) {
      const formattedErrors = formatErrors.laravel(error);
      if (formattedErrors) {
        errors.value = formattedErrors;
      }
    } else {
      generalError.value = error.message || "An error occurred.";
    }
  }
};

onMounted(() => {
  setInitialFormValues();
  subscribe(`${props.modelID}_done`, handleResponse);

  subscribe(`${props.modelID}`, (e) => {
    record.value = e.record;
    if (e.record?.id) {
      method.value = "put";
    }
  });
});

watch(
  () => route.query,
  () => {
    setInitialFormValues();
  },
  { immediate: true }
);

watch(
  () => record.value,
  (newRecord) => {
    if (newRecord) {
      setInitialFormValues();
    }
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
.form-error {
  color: #ff0000;
}
</style>
