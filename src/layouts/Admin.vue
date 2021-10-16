<template>
  <div class="max-h-screen overflow-hidden">
    <navbar />
    <div class="relative flex h-screen">
      <div class="w-72 bg-gray-200 nav">
        <router-link
          to="/admin/report-post"
          class="block bg-gray-300 py-2 my-1 px-4 my-text-content text-gray-800 hover:bg-blue-200"
          >Report Post</router-link
        >
        <router-link
          to="/admin/report-user"
          class="block bg-gray-300 py-2 my-1 px-4 my-text-content text-gray-800 hover:bg-blue-200"
          >Report User</router-link
        >
        <router-link
          to="/admin/ban-list"
          class="block bg-gray-300 py-2 my-1 px-4 my-text-content text-gray-800 hover:bg-blue-200"
          >Ban list</router-link
        >
      </div>
      <div class="container mx-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "AdminLayout",
  components: {
    Navbar,
  },
};
</script>

<style></style>
