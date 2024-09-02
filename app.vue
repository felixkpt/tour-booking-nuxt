<!-- App.vue -->
<template>
  <NuxtLayout>
    <div class="AppMainPage">
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthUser } from "~/composables/user";
import { useRouter } from "vue-router";
import axios from "axios";
import { appConfig } from "./utils/helpers";

// Initialize user state
const authUser = useAuthUser();
const router = useRouter();

const fetchUser = async () => {
  try {
    const response = await axios.get(appConfig.api.url("/api/auth/get-user"), {
      headers: {
        Authorization: `Bearer ${authUser.value?.token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Update user with new data and token
    authUser.value = {
      ...response.data.results,
    };

    // Store updated user data in localStorage
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify(authUser.value));
    }, 200);
  } catch (error) {
    if (error.response?.status === 401) {
      // Token is invalid, redirect to login
      router.push("/login");
    } else {
      console.error("An error occurred while fetching the user:", error);
    }
  }
};

// Fetch user data from localStorage or API
onMounted(async () => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    authUser.value = JSON.parse(storedUser);
    setTimeout(async () => {
      await fetchUser();
    }, 100);
  } else {
    router.push("/login"); // No stored user
  }
});
</script>
