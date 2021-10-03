<template>
  <div class="flex justify-center mt-8">
    <div
      class="bg-white w-9 h-9 mx-0.5 rounded-lg flex items-center justify-center cursor-pointer"
      :class="{ 'bg-blue-600 text-white': currPage === i }"
      v-for="i in allPages"
      :key="i"
      @update="updateCurrPage"
      @click="updateCurrPage(i)"
    >
      {{ i }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    allPages: "",
    currPage: "",
  },
  methods: {
    updateCurrPage(page) {
      this.$emit("update", page);
    },
    log(something) {
      console.log(something);
    },
  },
};
</script>

<style lang="scss" scoped></style>>
