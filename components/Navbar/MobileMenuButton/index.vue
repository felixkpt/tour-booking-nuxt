<template>
  <div class="md:hidden flex items-center">
    <button @click="$emit('toggleMobileMenu')">
      <svg
        class="w-6 h-6 text-gray-700"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </button>
  </div>
</template>
