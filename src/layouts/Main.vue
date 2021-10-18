<template>
  <div class="min-h-screen">
    <navbar />
    <div class="container mx-auto bg-shark-500">
      <slot />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "MainLayout",
  components: {
    Navbar,
  },
};
</script>

<style></style>
