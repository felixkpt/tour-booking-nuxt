<template>
  <transition name="fade">
    <div v-show="visible" class="modal-overlay" @click.self="close">
      <div
        class="modal-content bg-light-primary dark:bg-dark-primary"
        :style="{ maxWidth: modalSize }"
      >
        <header class="modal-header">
          <h3>&nbsp;</h3>
          <button class="modal-close" @click="close">×</button>
        </header>
        <main class="modal-body">
          <slot></slot>
        </main>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
import { publish, subscribe } from "~/components/BaseComponents/utils/pubSub";

const props = defineProps({
  modelID: String,
  title: {
    type: String,
    default: "",
  },
  submitLabel: {
    type: String,
    default: "Submit",
  },
  modalSize: {
    type: String,
    default: "lg",
  },
});

// Reactive state for visibility
const visible = ref(false);
const modalSize = ref(getModalSize(props.modalSize));

function getModalSize(size: string): string {
  switch (size) {
    case "sm":
      return "400px";
    case "md":
      return "550px";
    case "lg":
      return "800px";
    case "xl":
      return "1200px";
    default:
      return "500px";
  }
}

const close = () => {
  visible.value = false;
  publish(`${props.modelID}_close`, {}); // Publish close event
};

onMounted(() => {
  subscribe(`${props.modelID}_closeModal`, () => close());
  subscribe(`${props.modelID}`, () => (visible.value = true));
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 3px;
  margin-bottom: 3px;
}

.modal-body {
  margin-bottom: 10px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}
</style>
