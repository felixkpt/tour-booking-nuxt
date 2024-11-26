<template></template>
<script setup lang="ts">
import { useRouter } from "vue-router";

import { onMounted } from "vue";
import { useAuthUser } from "~/composables/user";
import axios from "axios";
import { appConfig } from "~/utils/helpers";

const props = defineProps({
  isRequired: {
    type: Boolean,
    default: false,
  },
});

// Initialize authUser state
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
      ...response.data.results, token:authUser.value.token
    };

    // Store updated authUser data in localStorage
    setTimeout(() => {
      localStorage.setItem("authUser", JSON.stringify(authUser.value));
    }, 200);
  } catch (error) {
    if (error.response?.status === 401) {
      // Token is invalid, redirect to login
      authUser.value = null
      localStorage.setItem("authUser", null);
      if (props.isRequired) {
        router.push("/login");
      }
    } else {
      console.error("An error occurred while fetching the user:", error);
    }
  }
};

// Fetch user data from localStorage or API
onMounted(async () => {
  const storedUser = localStorage.getItem("authUser");
  if (storedUser) {
    authUser.value = JSON.parse(storedUser);
    await fetchUser();
  } else if (props.isRequired) {
    router.push("/login"); // No stored user
  }
});
</script>
