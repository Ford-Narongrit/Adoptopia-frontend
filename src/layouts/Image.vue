<template>
  <div>
    <navbar />
    <slot />
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
