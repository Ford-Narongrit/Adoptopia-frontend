<template>
  <div>
    <navbar />
    <div class="container mx-auto min-h-screen">
      <slot />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
  name: "MainLayout",
  components: {
    Navbar,
  },
};
</script>

<style>
</style>