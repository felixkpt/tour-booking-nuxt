<template>
  <div
    class="DefaultLayout bg-light-primary-subtle dark:bg-dark-primary-subtle text-light-text dark:text-dark-text min-h-screen p-4"
  >
    <Navbar />
    <div class="flex mt-4 p-0 m-0">
      <div class="w-[19%]">
        <Sidenav />
      </div>
      <div class="w-[79%]">
        <slot />
      </div>
    </div>
  </div>
</template>
