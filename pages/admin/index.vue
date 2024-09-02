<template>
    <div class="dashboard-container cursor-default">
      <NuxtLink to="/admin/destinations" class="card" v-if="stats">
        <i class="fa-solid fa-map-marker-alt card-icon"></i>
        <h3>Destinations</h3>
        <p>{{ stats.destinations }}</p>
      </NuxtLink>
      <NuxtLink to="/admin/tours" class="card" v-if="stats">
        <i class="fa-solid fa-route card-icon"></i>
        <h3>Tours</h3>
        <p>{{ stats.tours }}</p>
      </NuxtLink>
      <NuxtLink to="/admin/tours/bookings" class="card" v-if="stats">
        <i class="fa-solid fa-calendar-check card-icon"></i>
        <h3>Bookings</h3>
        <p>{{ stats.bookings }}</p>
      </NuxtLink>
      <NuxtLink to="/admin/tours/tickets" class="card" v-if="stats">
        <i class="fa-solid fa-ticket-alt card-icon"></i>
        <h3>Tickets</h3>
        <p>{{ stats.tickets }}</p>
      </NuxtLink>
      <NuxtLink to="/admin/settings/users" class="card" v-if="stats">
        <i class="fa-solid fa-users card-icon"></i>
        <h3>Users</h3>
        <p>{{ stats.users }}</p>
      </NuxtLink>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from "vue";
  import { appConfig } from "~/utils/helpers";
  import { useAuthUser } from "~/composables/user";
  
  const stats = ref(null);
  const authUser = useAuthUser();
  const token = ref(authUser.value?.token);
  
  const fetchData = async () => {
    if (!token.value) {
      console.error("Token is not available");
      return;
    }
  
    try {
      const response = await fetch(appConfig.api.url("/api/admin/stats"), {
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch stats");
      stats.value = await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  
  watch(
    () => authUser.value?.token,
    (newToken) => {
      token.value = newToken;
      setTimeout(() => {
        fetchData();
      }, 200);
    },
    { immediate: true }
  );
  </script>
  
  <style scoped>
  .dashboard-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    padding: 20px;
  }
  
  .card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none; 
    color: inherit;
    transition: box-shadow 0.3s ease;
  }
  
  .card:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
  
  .card-icon {
    font-size: 40px;
    margin-bottom: 10px;
    color: #4a4a4a;
  }
  
  .card h3 {
    margin: 0 0 10px;
    font-size: 18px;
  }
  
  .card p {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
  }
  </style>
  