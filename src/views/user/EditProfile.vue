<template>
  <div>
    <div class="my-text-super text-white text-center py-5">Edit Profile</div>
    <div class="flex justify-center">
      <div
        class="md:w-2/3 xl:w-3/4 w-full space-y-4 bg-shark-400 rounded-lg p-5"
      >
        <!-- Cover Photo -->
        <div class="space-y-2">
          <label for="username" class="my-text-content block text-white"
            >Cover photo</label
          >
          <input
            type="file"
            accept="image/*"
            id="cover"
            ref="cover"
            @change="changeCover"
            class="hidden"
          />
          <div
            class="relative"
            @mouseover="hoverCover = true"
            @mouseleave="hoverCover = false"
          >
            <img
              :src="showImage.cover"
              alt="cover"
              class="
                w-full
                xl:h-72
                md:h-52
                h-40
                inline
                object-cover object-center
                rounded-xl
                shadow-lg
              "
              style="z-index: 0"
            />
            <div
              v-if="hoverCover"
              class="
                absolute
                top-0
                flex
                justify-center
                items-center
                w-full
                h-full
                rounded-xl
                bg-black
                opacity-80
                my-block-focus
              "
              @click="$refs.cover.click()"
              tabindex="1"
            >
              <div class="text-center text-white my-text-content">
                Upload cover
              </div>
            </div>
          </div>
        </div>

        <!-- Profile picture -->
        <div class="space-y-2">
          <label for="username" class="my-text-content block text-white"
            >Profile picture</label
          >
          <!-- upload -->
          <input
            type="file"
            accept="image/*"
            id="profile"
            ref="profile"
            @change="changeProfile"
            class="hidden"
          />
          <div class="flex justify-center items-center">
            <span
              class="relative rounded-full cursor-pointer"
              @mouseover="hoverProfile = true"
              @mouseleave="hoverProfile = false"
            >
              <img
                :src="showImage.profile"
                alt="profile"
                :title="form.name"
                class="
                  object-cover
                  w-36
                  h-36
                  rounded-full
                  shadow-xl
                  border-4 border-gray-900
                  mx-auto
                "
              />
              <div
                v-if="hoverProfile"
                class="
                  absolute
                  w-36
                  h-36
                  top-0
                  rounded-full
                  flex
                  justify-center
                  items-center
                  bg-black
                  opacity-80
                  my-block-focus
                "
                @click="$refs.profile.click()"
                tabindex="1"
              >
                <div class="text-center text-white my-text-content">
                  Upload profile
                </div>
              </div>
            </span>
          </div>
        </div>

        <!-- name -->
        <div class="space-y-2">
          <label for="username" class="my-text-content block text-white"
            >name</label
          >
          <input
            type="text"
            placeholder="Name"
            class="my-text-content rounded-lg w-full px-2 py-1"
            v-model="form.name"
            :class="errors.name ? 'my-block-error ' : 'my-block-focus'"
          />
          <ul v-if="errors.name" class="text-red-400">
            <li v-for="(message, index) in errors.name" :key="index">
              {{ message }}
            </li>
          </ul>
        </div>

        <!-- description -->
        <div class="space-y-2">
          <label for="description" class="my-text-content block text-white"
            >description</label
          >
          <textarea
            placeholder="Tell us a little bit about yourself"
            name="description"
            id="description"
            cols="20"
            rows="4"
            class="my-text-content rounded-lg w-full px-2 py-1"
            v-model="form.description"
            :class="errors.description ? 'my-block-error ' : 'my-block-focus'"
            style="resize: none"
          >
          </textarea>
          <ul v-if="errors.description" class="text-red-400">
            <li v-for="(message, index) in errors.description" :key="index">
              {{ message }}
            </li>
          </ul>
        </div>
        <div class="flex justify-end space-x-4">
          <button
            @click="reset"
            class="
              bg-blue-600
              rounded-lg
              p-3
              text-white
              my-text-content
              hover:bg-blue-400
              my-block-focus
            "
          >
            Reset
          </button>
          <button
            @click="editProfile"
            class="
              bg-green-600
              rounded-lg
              p-3
              text-white
              my-text-content
              hover:bg-green-400
              my-block-focus
            "
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserStore from "@/store/User";
import Alert from "@/helpers/Alert";
export default {
  data() {
    return {
      errors: [],
      hoverProfile: false,
      hoverCover: false,
      showImage: {
        profile: "",
        cover: "",
      },
      fileImage: {
        profile: null,
        cover: null,
      },
      form: {},
      bgImage:
        "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      try {
        let res = await UserStore.dispatch("getMe");
        this.form = res.data;
        this.showImage.profile = process.env.VUE_APP_APIURL + this.form.profile;
        this.showImage.cover = process.env.VUE_APP_APIURL + this.form.cover;
      } catch (error) {
        console.error(error);
      }
    },
    async editProfile() {
      let data = {
        name: this.form.name,
        description: this.form.description,
        cover: this.fileImage.cover,
        profile: this.fileImage.profile,
      };
      let payload = new FormData();
      Object.keys(data).forEach((key) => {
        payload.append(key, data[key]);
      });
      try {
        let res = await UserStore.dispatch("update", payload);
        Alert.mixin("success", res.data.message);
        this.$router.push("/profile/home");
      } catch (error) {
        this.errors = error.response.data;
        Alert.window(
          "error",
          "Edit Failed",
          "Sorry, an unexpected error occurred. Please try again."
        );
        console.error(error.response);
      }
    },
    reset() {
      this.errors = [];
      this.fetch();
    },
    changeProfile(event) {
      this.fileImage.profile = event.target.files[0];
      this.showImage.profile = URL.createObjectURL(event.target.files[0]);
    },
    changeCover(event) {
      this.fileImage.cover = event.target.files[0];
      this.showImage.cover = URL.createObjectURL(event.target.files[0]);
    },
  },
};
</script>

<style></style>
