<template>
    <div>
      <button
        :class="buttonClasses"
        type="submit"
        :disabled="loading"
        @click="handleClick"
      >
        {{ loading ? 'Loading...' : title || 'Submit' }}
      </button>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { computed } from 'vue';
  
  const props = defineProps<{
    title?: string;
    loading: boolean;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    type?: 'primary' | 'success' | 'error' | 'info' | 'warning';
    onClick?: () => void;
  }>();
  
  const sizeClass = computed(() => {
    switch (props.size) {
      case 'xs': return 'btn-xs';
      case 'sm': return 'btn-sm';
      case 'lg': return 'btn-lg';
      default: return 'btn-md';
    }
  });
  
  const typeClass = computed(() => {
    switch (props.type) {
      case 'primary': return 'btn-primary';
      case 'error': return 'btn-error';
      case 'info': return 'btn-info';
      case 'warning': return 'btn-warning';
      default: return 'btn-primary';
    }
  });
  
  const buttonClasses = computed(() => `btn ${typeClass.value} ${sizeClass.value}`);
  
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };
  </script>
  