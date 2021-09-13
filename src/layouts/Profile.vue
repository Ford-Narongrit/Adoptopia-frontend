<template>
  <div>
    <navbar />
    <div class="w-full fixed h-80 bg-gradient-to-b from-transparent via-transparent to-shark-400" style="z-index: -1;"></div>
    <div
      class="w-full fixed h-80 bg-cover bg-fixed bg-no-repeat bg-red-400"
      :style="{ backgroundImage: 'url(' + `${bgImage}` + ')' }"
      style="z-index: -2;"
    ></div>
    <div class="container mx-auto pt-40">
      <slot />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
  name: "ProfileLayout",
  data() {
    return {
      user: {},
      bgImage:
        "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    };
  },
  components: {
    Navbar,
  },
};
</script>
