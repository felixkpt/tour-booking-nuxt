<!-- App.vue -->
<template>
  <NuxtLayout>
    <div class="AppMainPage">
      <NuxtPage />
    </div>
    <AuthUser :isRequired="true" />
  </NuxtLayout>
</template>
