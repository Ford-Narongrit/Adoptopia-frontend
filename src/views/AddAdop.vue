<template>
  <div class="w-full">
    <div class="mt-8 mb-6 ml-8 text-white text-3xl">Add Adopt</div>
    <div class="flex">
      <div class="w-2/3 h-full px-10 py-5 flex justify-center item-center">
        <!-- upload images -->
        <input
          type="file"
          ref="image"
          style="display: none"
          @change="addImage"
          multiple
        />
        <div
          v-if="!images.length"
          class="w-3/4 h-80 border-white border-2 relative"
          @mouseover="hoverImage = true"
          @mouseleave="hoverImage = false"
          @click="$refs.image.click()"
          @drop.prevent="addImage($event)"
        >
          <font-awesome-icon
            icon="camera"
            class="absolute text-7xl text-white top-1/3 left-56"
          />
          <div
            v-if="hoverImage"
            class="absolute w-full h-full flex justify-center items-center bg-black opacity-80 text-white text-xl"
          >
            Upload Image
          </div>
          <div class="absolute -bottom-8 left-48 text-red-500 text-center">
            <ul v-if="errors.images" class="">
              <li v-for="(message, index) in errors.images" :key="index">
                {{ message }}
              </li>
            </ul>
            <p v-if="!errors.images" class="">
              Maximum: 5 images
            </p>
          </div>
        </div>
        <!-- sroll wrap -->
        <div
          class="h-80 px-4 overflow-y-auto overflow-hidden"
          v-if="images.length"
        >
          <!-- grid container -->
          <div class="grid grid-cols-3 w-full gap-4">
            <!-- uploaded images -->
            <div v-for="(image, index) in images" :key="index">
              <div
                class="w-48 h-32 bg-cover bg-center rounded-lg border-white border-2 cursor-pointer relative"
                :style="{ backgroundImage: 'url(' + `${image.url}` + ')' }"
                @click="clickImg(image)"
                @mouseover="image.hover = true"
                @mouseleave="image.hover = false"
              >
                <div
                  v-if="image.hover"
                  class="absolute w-full h-full bg-black opacity-80 rounded-lg "
                >
                  <div
                    class="relative top-0 left-36 ml-3 w-8 h-8 bg-red-700 rounded-lg hover:bg-red-500"
                    @click="removeImage(index)"
                    v-on:click.stop="clickImg"
                  >
                    <font-awesome-icon
                      icon="trash"
                      class=" text-white absolute ml-0.5 left-2 top-2 "
                    />
                  </div>
                  <div class="relative left-16 ">
                    <font-awesome-icon
                      icon="search-plus"
                      class="absolute text-5xl text-white left-2 top-2"
                    />
                  </div>
                </div>
              </div>
              <div
                v-if="image.show"
                class="left-0 right-0 top-16 bottom-0 absolute bg-black z-10 flex items-center cursor-pointer"
                @click="clickImg(image)"
              >
                <img
                  class="mx-auto cursor-pointer max-w-full max-h-full"
                  :src="image.url"
                  alt="preview img"
                />
              </div>
            </div>

            <!-- add more images -->
            <div
              v-if="this.form.images.length < 5"
              class="w-48 h-32 rounded-lg border-white border-2 border-dashed relative"
              @click="$refs.image.click()"
              @drop.prevent="addImage($event)"
              @mouseover="hoverImage = true"
              @mouseleave="hoverImage = false"
            >
              <div class="relative top-1/2 left-4">
                <div class="absolute w-12 h-1.5 bg-white  left-14"></div>
              </div>
              <div class="absolute w-1.5 h-12 bg-white top-10 left-1/2"></div>

              <!-- <font-awesome-icon icon="plus" class="absolute text-7xl text-white top-6 left-16"/> -->
              <div
                v-if="hoverImage"
                class="absolute w-full h-full flex justify-center items-center bg-black opacity-80 text-white text-xl"
              >
                Upload Image
              </div>
            </div>
          </div>
          <div class="mt-3 bottom-6 text-red-500 text-center">
            Maximum: 5 images
          </div>
        </div>
      </div>

      <div class="w-2/3">
        <div class="justify-center h-full bg-shark-500">
          <div class="ml-8">
            <!-- Name -->
            <div class="space-y-1 w-4/5 justify-evenly ">
              <label
                for="name"
                class="my-text-content w-32 items-center flex text-white "
                >Name:
              </label>

              <input
                type="text"
                placeholder="Name"
                class="my-text-content rounded-lg w-2/3 px-2 py-1 my-block-focus"
                :class="errors.name ? 'my-block-error ' : 'my-block-focus'"
                v-model="form.name"
              />
            </div>
            <ul v-if="errors.name" class="text-red-400 flex-none mb-4">
              <li v-for="(message, index) in errors.name" :key="index">
                {{ message }}
              </li>
            </ul>

            <!--Catagory -->
            <div class="space-y-1 w-4/5 mt-4 justify-evenly">
              <label
                for="catagory"
                class="my-text-content w-32 items-center text-white"
                >Catagory:
              </label>

              <multiselect
                class="my-text-base rounded-lg w-2/3 my-block-focus"
                :class="errors.category ? 'my-block-error ' : 'my-block-focus'"
                v-model="form.catagory"
                :options="categories"
                :multiple="true"
                :close-on-select="false"
                :clear-on-select="false"
                :preserve-search="true"
                :limit="3"
                placeholder="Search or select category"
                label="name"
                track-by="name"
                :max="7"
                @input="maxSelected()"
              >
              </multiselect>
            </div>
            <ul v-if="errors.category" class="text-red-400 flex-none mb-4">
              <li v-for="(message, index) in errors.category" :key="index">
                {{ message }}
              </li>
            </ul>

            <!--Agreement -->
            <div class="space-y-1 w-4/5 mt-4 justify-evenly">
              <div>
                <label for="agreement" class="my-text-content w-32 text-white"
                  >Agreement:
                </label>
              </div>
              <textarea
                type="text"
                placeholder="Agreement"
                class="my-text-content rounded-lg w-2/3 h-40 px-2 py-1 my-block-focus"
                :class="errors.agreement ? 'my-block-error ' : 'my-block-focus'"
                v-model="form.agreement"
              />
            </div>
            <ul v-if="errors.agreement" class="text-red-400 flex-none mb-4">
              <li v-for="(message, index) in errors.agreement" :key="index">
                {{ message }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <button
        class="bg-blue-600 rounded-full w-28 p-2 mt-8 text-white my-text-content hover:bg-blue-400 my-block-focus"
        @click="addAdopt()"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Alert from "../helpers/Alert";
import UserStore from "../store/User";
import Multiselect from "vue-multiselect";
import Header from "@/helpers/Header";

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      hoverImage: false,

      user: {},
      maxItemsSelected: false,
      errors: [],

      images: [],
      categories: ["A", "B", "C"],
      form: {
        name: null,
        catagory: [],
        agreement: null,
        images: [],
      },
    };
  },
  methods: {
    clickImg(image) {
      image.show = !image.show;
    },
    async addAdopt() {
      try {
        let res = await UserStore.dispatch("getMe");
        this.user = res.data;
      } catch (error) {
        Alert.window("error", "Unauthorized", "Please login before add adop.");
        console.error(error);
      }
      let payload = new FormData();
      if (this.form.name !== null) {
        payload.append("name", this.form.name);
      }
      Object.keys(this.form.catagory).forEach((key) => {
        payload.append(`category[${key}]`, this.form.catagory[key].id);
      });
      if (this.form.agreement !== null) {
        payload.append("agreement", this.form.agreement);
      }
      Object.keys(this.form.images).forEach((key) => {
        payload.append(`images[${key}]`, this.form.images[key]);
      });
      let config = Header.getHeaders({ "Content-Type": "multipart/form-data" });
      try {
        let res = await axios.post("/adopt", payload, config);
        Alert.mixin("success", "Add adopt successfully");
        this.$router.push({path:`/${this.user.username}/adop`})
      } catch (error) {
        this.errors = error.response.data.errors;
        Alert.window(
          "error",
          "Add adop failed",
          "Sorry, an unexpected error occurred. Please try again."
        );
        console.error(this.errors);
      }
    },
    addImage(e) {
      let files = null;
      if (e.type === "drop") {
        files = e.dataTransfer.files;
      } else if (e.type === "change") {
        files = e.target.files;
      }

      if (files) {
        let isExceed = false;
        for (let i = 0; i < files.length; i++) {
          if (this.form.images.length === 5) {
            isExceed = true;
            break;
          }
          this.form.images.push(files[i]);
          let data = {
            url: URL.createObjectURL(files[i]),
            show: false,
            hover: false,
          };
          this.images.push(data);
        }

        if (isExceed)
          Alert.window(
            "error",
            "You adding more than 5 Images",
            "Maximum images are 5 images per adop. We will keep your first 5 images. In case you want to change your images consider removing some of those first."
          );
      }
      this.hoverImage = false;
    },
    removeImage(index) {
      this.images.splice(index, 1);
      this.form.images.splice(index, 1);
    },

    async fetchCategory() {
      let res = await axios.get("/category");
      this.categories = res.data;
    },
    maxSelected() {
      const selectedItems = this.form.catagory.length;
      this.maxItemsSelected = false;
      if (selectedItems >= 7) {
        this.maxItemsSelected = true;
      }
    },
  },
  created() {
    this.fetchCategory();
  },
};
</script>

<style lang="scss" scoped></style>
