<template>
  <div
    class="w-full p-5 bg-light-primary dark:bg-dark-primary dark:text-light-primary rounded-lg shadow-md overflow-auto"
  >
    <div class="flex justify-center">
      <span v-if="notificationMessage" class="text-red-400 text-lg">
        {{ notificationMessage }}
      </span>
    </div>

    <BaseComponentsAutosGeneralNotification
      :showMessage="notificationMessage"
    />

    <div class="mb-5">
      <input
        v-model="searchQuery"
        @input="handleSearch"
        type="text"
        placeholder="Search..."
        class="w-full px-3 py-2 border bg-light-primary dark:bg-dark-primary border-light-border rounded-md text-light-text dark:text-light-primary-subtle focus:outline-none focus:border-light-secondary focus:ring-1 focus:ring-light-info"
      />
    </div>
    <table class="w-full border-collapse mb-5">
      <thead class="cursor-default">
        <tr>
          <th
            v-for="header in headers"
            :key="header"
            class="px-3 py-2 bg-light-secondary text-light-text dark:text-dark-text border-b border-light-border text-left"
          >
            {{ header.label || header.key }}
          </th>
          <th
            v-if="actions.length"
            class="px-3 py-2 bg-light-secondary text-light-text dark:text-dark-text border-b border-light-border text-left"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td
            :colspan="headers.length + (actions.length ? 1 : 0)"
            class="text-center py-4 text-dark-primary-subtle dark:text-light-primary-subtle font-bold"
          >
            Loading...
          </td>
        </tr>
        <tr v-for="(record, index) in paginatedData" :key="index">
          <td
            v-for="(header, headerIndex) in headers"
            :key="headerIndex"
            class="px-3 py-2 border-b border-light-border text-light-text dark:text-dark-text"
          >
            <span
              v-if="header.renderCell"
              v-html="header.renderCell(record, header.key)"
            ></span>
            <span v-else>{{ getDynamicValue(record, header.key) }}</span>
          </td>
          <td
            v-if="actions.length"
            class="px-3 py-2 border-b border-light-border"
          >
            <div
              v-if="actionsMode === 'dropdown'"
              class="relative inline-block"
            >
              <button
                @click="toggleDropdown(index)"
                class="bg-light-secondary text-light-text dark:text-dark-text px-3 py-2 border border-light-border rounded-md focus:outline-none"
              >
                Actions
              </button>
              <div
                v-show="openDropdown === index"
                class="absolute right-0 mt-2 w-48 bg-gray-200 dark:bg-gray-800 rounded-md shadow-lg z-10"
              >
                <button
                  v-for="(action, actionIndex) in actions"
                  :key="actionIndex"
                  @click="handleDropdownAction(action, record)"
                  class="w-full text-left px-4 py-2 hover:bg-light-info hover:text-gray-800"
                >
                  {{ action.label }}
                </button>
              </div>
            </div>
            <div v-else class="flex space-x-2">
              <button
                v-for="(action, actionIndex) in actions"
                :key="actionIndex"
                @click="action.callback(record)"
                class="bg-light-secondary text-light-text dark:text-dark-text px-3 py-2 rounded-md focus:outline-none hover:bg-light-info"
              >
                {{ action.label }}
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between items-center">
      <button
        :disabled="currentPage === 1"
        @click="prevPage"
        class="bg-light-secondary text-light-text dark:text-dark-text px-4 py-2 rounded-md disabled:bg-light-border dark:disabled:bg-dark-border focus:outline-none hover:bg-light-info"
      >
        Previous
      </button>
      <span class="text-light-text dark:text-dark-text"
        >Page {{ currentPage }} of {{ totalPages }}</span
      >
      <button
        :disabled="currentPage === totalPages"
        @click="nextPage"
        class="bg-light-secondary text-light-text dark:text-dark-text px-4 py-2 rounded-md disabled:bg-light-border dark:disabled:bg-dark-border focus:outline-none hover:bg-light-info"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, defineProps, defineEmits } from "vue";
import axios from "axios";
import { appConfig } from "~/utils/helpers";
import { useAuthUser } from "~/composables/user";

import _ from "lodash";
const { debounce } = _;

// Props
const props = defineProps({
  headers: {
    type: Array as () => Array<{
      key: string;
      label?: string;
      renderCell?: (record: any, key: string) => string;
    }>,
    required: true,
  },
  apiUrl: {
    type: String,
    required: true,
  },
  actions: {
    type: Array as () => Array<{
      label: string;
      callback: (record: any) => void;
    }>,
    default: () => [],
  },
  actionsMode: {
    type: String as () => "dropdown" | "buttons",
    default: "buttons",
  },
  renderCell: {
    type: Function as () => (record: any, header: any) => string,
    default: undefined,
  },
  reloadKey: {
    type: [String, Number],
    default: 0,
  },
});

// Define emits
const emit = defineEmits<{
  (e: "set-model-details", payload: any): void;
}>();

// State
const currentPage = ref(1);
const searchQuery = ref("");
const data = ref([]);
const totalPages = ref(1);
const localKey = ref(0); // Local key for internal tracking

// Computed
const paginatedData = computed(() => data.value);
const loading = ref(false);

const notificationMessage = ref("");

// Methods
const fetchData = async () => {
  loading.value = true;

  try {
    const authUser = useAuthUser();
    const config = {};

    if (authUser.value?.token) {
      config.headers = {
        Authorization: `Bearer ${authUser.value.token}`,
      };
    }

    const response = await axios.get(
      appConfig.api.url(
        `${props.apiUrl}?page=${currentPage.value}&search=${searchQuery.value}&localKey=${localKey.value}`
      ),
      config
    );

    const results = response.data?.results;
    if (results) {
      const beData = results.data;
      data.value = beData;

      const others = results;
      others["data"] = null;
      totalPages.value = others.last_page;
      emit("set-model-details", others);
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403) {
        notificationMessage.value = "You don't have sufficient permissions.";
      } else if (error.response.status === 401) {
        window.location.href = "/login"; // Redirect to login page
      }
    } else {
      (notificationMessage.value = "Failed to fetch data:"), error;
    }
  } finally {
    loading.value = false;
  }
};

const openDropdown = ref<number | null>(null);

const toggleDropdown = (index: number) => {
  openDropdown.value = openDropdown.value === index ? null : index;
};

const handleDropdownAction = (action: any, record: any) => {
  action.callback(record);
  // Optionally close the dropdown after an action
  openDropdown.value = null;
};

// Debounced Search Handler
const debouncedFetchData = debounce(() => {
  currentPage.value = 1;
  fetchData();
}, 500);

const handleSearch = () => {
  debouncedFetchData();
};

function getDynamicValue(row: any, path: string) {

if (!path.match(/\./)) {
    const val = row[path]
    return String(val);
} else {
    return path.split('.').reduce((acc, prop) => acc && acc[prop], row);
}
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    fetchData();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
    fetchData();
  }
};

// Watchers and Lifecycle Hooks
watch(currentPage, () => fetchData());
watch(searchQuery, () => {
  debouncedFetchData();
});
onMounted(() => fetchData());

// Watch for changes in reloadKey
watch(
  () => props.reloadKey,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      localKey.value += 1;
      fetchData();
    }
  }
);
</script>

<style scoped>
.search-container {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--bg-hover);
  border-radius: 4px;
  font-size: 16px;
  color: var(--text-color);
  background-color: var(--bg-light);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.search-input:focus {
  outline: none;
  border-color: var(--bg-secondary);
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
}

.table-container {
  width: 100%;
  padding: 20px;
  background-color: var(--bg-light);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.table-header {
  padding: 10px;
  background-color: var(--bg-secondary);
  color: var(--text-color);
  text-align: left;
  border-bottom: 2px solid var(--bg-hover);
}

.table-cell {
  padding: 10px;
  border-bottom: 1px solid var(--bg-hover);
  color: var(--text-color);
}

.table-cell button {
  padding: 5px 10px;
  background-color: var(--bg-secondary);
  color: var(--text-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.table-cell button:hover {
  background-color: var(--bg-hover);
}

.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-btn {
  padding: 8px 16px;
  background-color: var(--bg-secondary);
  color: var(--text-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination-btn:disabled {
  background-color: var(--bg-hover);
  cursor: not-allowed;
}

.pagination-btn:hover:not(:disabled) {
  background-color: var(--bg-hover);
}

.page-info {
  color: var(--text-color);
}

.loading-row {
  text-align: center;
  padding: 20px;
  color: var(--text-color);
  font-weight: bold;
  background-color: var(--bg-light);
}

.dropdown-container {
  position: relative;
  display: inline-block;
}

.dropdown-btn {
  background-color: var(--bg-secondary);
  color: var(--text-color);
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.dropdown-menu {
  display: none;
  position: absolute;
  background-color: var(--bg-secondary);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  right: 0;
  z-index: 1;
}

.dropdown-container:hover .dropdown-menu,
.dropdown-menu {
  display: block;
}

.dropdown-menu {
  display: none; /* Hide by default */
}

.dropdown-menu[v-show="true"] {
  display: block; /* Show when `v-show` is true */
}

.dropdown-item {
  padding: 10px;
  border: none;
  background: none;
  text-align: left;
  width: 100%;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: var(--bg-hover);
}

.button-group .action-btn {
  padding: 5px 10px;
  background-color: var(--bg-secondary);
  color: var(--text-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button-group .action-btn:hover {
  background-color: var(--bg-hover);
}
</style>
