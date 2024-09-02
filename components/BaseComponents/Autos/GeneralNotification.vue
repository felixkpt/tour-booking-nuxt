<template>
    <transition name="fade">
      <div
        v-if="visible"
        class="fixed bottom-4 right-4 p-4 bg-dark-info text-light-primary-subtle dark:bg-dark-info dark:text-dark-primary-subtle rounded-lg shadow-lg"
      >
        {{ message }}
        <button @click="close" class="ml-2 text-white dark:text-light-secondary">✖</button>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const visible = ref(false);
  const message = ref("");
  
  const close = () => {
    visible.value = false;
  };
  
  // Props to set message and show the notification
 const props = defineProps({
    showMessage: {
      type: String,
      default: "",
    },
  });
  
  watch(
    () => props.showMessage,
    (newMessage) => {
      if (newMessage) {
        message.value = newMessage;
        visible.value = true;
        setTimeout(() => (visible.value = false), 5000);
      }
    }
  );
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
  </style>
  