<!-- App.vue -->
<template>
  <NuxtLayout>
    <div class="AppMainPage">
      <NuxtPage />
    </div>
    <AuthUser :isRequired="false" />
  </NuxtLayout>
</template>
