<template>
  <div v-if="images.length > 0">
    <div class="w-full h-full bg-shark-700 relative overflow-hidden">
      <div class="flex justify-center items-center h-full">
        <img
          :src="getImagePath(images[image_index].path)"
          :alt="image_index"
          :height="
            resizeImage(images[image_index].width, images[image_index].height)
              .height
          "
          :width="
            resizeImage(images[image_index].width, images[image_index].height)
              .width
          "
        />
      </div>
      <button
        v-if="image_index > 0"
        class="absolute h-full top-0 left-0 px-5 hover:bg-shark-500 rounded-r-full"
        @click="prevImage()"
      >
        <font-awesome-icon icon="caret-left" class="text-5xl text-white" />
      </button>
      <button
        v-if="image_index < images.length - 1"
        class="absolute h-full top-0 right-0 px-5 hover:bg-shark-500 rounded-l-full"
        @click="nextImage()"
      >
        <font-awesome-icon icon="caret-right" class="text-5xl text-white" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      image_index: 0,
    };
  },
  methods: {
    nextImage() {
      this.image_index++;
    },
    prevImage() {
      this.image_index--;
    },
    getImagePath(image) {
      return process.env.VUE_APP_APIURL + image;
    },
    resizeImage(image_width, image_height) {
      let resize = {
        width: image_width,
        height: image_height,
      };
      while (
        resize.width > window.innerWidth ||
        resize.height > window.innerHeight
      ) {
        resize.width--;
        resize.height--;
      }
      return resize;
    },
  },
};
</script>

<style></style>