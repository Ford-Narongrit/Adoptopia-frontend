<template>
  <div id="app">
    <layout>
      <router-view />
    </layout>
  </div>
</template>

<script>
import Layout from "./layouts/Layout.vue";
export default {
  name: "App",
  components: { Layout },
};
</script>
<style>
body{
  background-color: #272727;
}
</style>