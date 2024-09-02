<template>
  <div class="sidenav-container">
    <div class="sidenav" :class="{ collapsed: !isExpanded }">
      <div class="sidenav-header">
        <h2 class="text-light-text dark:text-dark-text">Menu</h2>
        <button @click="toggleNav" class="toggle-btn">
          <span v-if="isExpanded">‹</span>
          <span v-else>›</span>
        </button>
      </div>
      <ul class="sidenav-list">
        <li v-for="item in menuItems" :key="item.title" class="sidenav-item">
          <div class="sidenav-link" @click="toggleItem(item)">
            <span class="icon">{{ item.icon }}</span>
            <span v-if="isExpanded" class="title">{{ item.title }}</span>
            <span v-if="item.children && isExpanded" class="arrow">
              {{ item.isExpanded ? "▲" : "▼" }}
            </span>
          </div>
          <ul v-if="item.children && item.isExpanded" class="sidenav-sublist">
            <li
              v-for="subItem in item.children"
              :key="subItem.title"
              class="sidenav-subitem"
            >
              <NuxtLink :to="subItem.to" class="sidenav-sublink">{{
                subItem.title
              }}</NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isExpanded = ref(true);

const menuItems = ref([
  {
    title: "Dashboard",
    icon: "🏠",
    to: "/", // Link for the main item
    isExpanded: false,
  },
  {
    title: "Tour",
    icon: "🌍",
    isExpanded: false,
    children: [
      { title: "Desinations", to: "/admin/destinations" },
      { title: "Tours", to: "/admin/tours" },
      { title: "Bookings", to: "/admin/tours/bookings" },
      { title: "Tickets", to: "/admin/tours/tickets" },
    ],
  },
  {
    title: "Settings",
    icon: "⚙️",
    isExpanded: false,
    children: [
      { title: "Users", to: "/admin/settings/users" },
      { title: "Roles", to: "/admin/settings/role-permissions/roles" },
      {
        title: "Permissions",
        to: "/admin/settings/role-permissions/permissions",
      },
    ],
  },
  {
    title: "Reports",
    icon: "📊",
    isExpanded: false,
    children: [
      { title: "Analytics", to: "#!" },
      { title: "Exports", to: "#!" },
    ],
  },
]);

const toggleNav = () => {
  isExpanded.value = !isExpanded.value;
};

const toggleItem = (item) => {
  item.isExpanded = !item.isExpanded;
};
</script>

<style scoped>
.sidenav-container {
  display: flex;
  height: 100vh;
  background-color: var(--bg-color);
}

.sidenav {
  width: 250px;
  background-color: var(--bg-secondary);
  padding: 20px;
  transition: width 0.3s ease;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidenav.collapsed {
  width: 80px;
}

.sidenav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.sidenav-list {
  list-style: none;
  padding: 0;
}

.sidenav-item {
  margin-bottom: 10px;
}

.sidenav-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  color: var(--text-color);
  background-color: var(--bg-light);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sidenav-link:hover {
  background-color: var(--bg-hover);
}

.icon {
  font-size: 20px;
}

.title {
  flex-grow: 1;
  margin-left: 10px;
}

.arrow {
  font-size: 12px;
}

.sidenav-sublist {
  list-style: none;
  padding: 10px 0 10px 20px;
}

.sidenav-subitem {
  margin-bottom: 5px;
}

.sidenav-sublink {
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.3s ease;
}

.sidenav-sublink:hover {
  color: var(--text-hover);
}

.toggle-btn {
  background: none;
  border: none;
  padding: 6px;
  font-size: 16px;
  cursor: pointer;
  color: var(--text-color);
}

:root {
  --bg-color: #f9fafb;
  --bg-secondary: #1f2937;
  --bg-light: #e5e7eb;
  --bg-hover: #d1d5db;
  --text-color: #1f2937;
  --text-hover: #111827;
}

.dark :root {
  --bg-color: #1f2937;
  --bg-secondary: #111827;
  --bg-light: #374151;
  --bg-hover: #4b5563;
  --text-color: #f9fafb;
  --text-hover: #d1d5db;
}
</style>
