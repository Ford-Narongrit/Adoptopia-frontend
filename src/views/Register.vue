<template>
  <div class="flex overflow-hidden min-h-screen">
    <div
      class="md:w-1/2 xl:w-2/3 md:block hidden bg-center bg-cover"
      :style="{ backgroundImage: 'url(' + `${image}` + ')' }"
    ></div>
    <div class="md:w-1/2 xl:w-1/3 w-full">
      <div class="flex justify-center items-center h-full bg-shark-500">
        <div class="rounded-lg p-5 space-y-4 w-3/4">
          <img src="../assets/logo.png" alt="logo" class="h-20 mx-auto" />
          <div class="my-text-title text-center text-white">REGISTER</div>

          <!-- input image -->
          <div class="mx-auto">
            <input
              type="file"
              ref="file"
              style="display: none"
              @change="addProfile"
            />
            <div
              class="bg-gray-100 overflow-hidden md:h-40 md:w-40 h-28 w-28 mx-auto rounded-full flex items-center relative cursor-pointer 
              my-block-focus
              bg-center bg-cover"
              @click="$refs.file.click()"
              @drop.prevent="addProfile($event)"
              @dragover.prevent
              @mouseover="hoverImage = true"
              @mouseleave="hoverImage = false"
              :style="{ backgroundImage: 'url(' + `${form.profile}` + ')' }"
              tabindex="1"
            >
              <!-- if hover to upload -->
              <div
                v-if="hoverImage"
                class="absolute w-full h-full flex justify-center items-center bg-black opacity-80"
              >
                <div class="text-center text-white my-text-content">
                  Upload File
                </div>
              </div>
            </div>
          </div>

          <!-- username -->
          <div class="space-y-1">
            <label for="username" class="my-text-content block text-white"
              >Username</label
            >
            <input
              type="text"
              placeholder="Username"
              class="my-text-content rounded-lg w-full px-2 py-1 my-block-focus"
              v-model="form.username"
            />
          </div>

          <!-- password -->
          <div class="space-y-1">
            <label for="password" class="my-text-content block text-white"
              >Password</label
            >
            <div class="relative">
              <input
                :type="isPassword ? 'text' : 'password'"
                placeholder="Password"
                class="my-text-content rounded-lg w-full px-2 py-1 my-block-focus"
                v-model="form.password"
              />
              <button
                class="absolute my-auto h-full right-0 p-1 my-10 rounded-lg bg-white"
                @click="isPassword = !isPassword"
                tabindex="-1"
              >
                <font-awesome-icon
                  :icon="isPassword ? 'eye' : 'eye-slash'"
                  class="my-text-content text-black"
                />
              </button>
            </div>
          </div>

          <!--Confirm password -->
          <div class="space-y-1">
            <label
              for="confirmPassword"
              class="my-text-content block text-white"
              >Confirm Password</label
            >
            <div class="relative">
              <input
                :type="isConPassword ? 'text' : 'password'"
                placeholder="Confirm Password"
                class="my-text-content rounded-lg w-full px-2 py-1 my-block-focus"
                v-model="form.confirm_password"
              />
              <button
                class="absolute my-auto h-full right-0 p-1 my-10 rounded-lg bg-white"
                @click="isConPassword = !isConPassword"
                tabindex="-1"
              >
                <font-awesome-icon
                  :icon="isConPassword ? 'eye' : 'eye-slash'"
                  class="my-text-content text-black"
                />
              </button>
            </div>
          </div>

          <!--Email -->
          <div class="space-y-1">
            <label for="email" class="my-text-content block text-white"
              >Email</label
            >
            <input
              type="text"
              placeholder="Email"
              class="my-text-content rounded-lg w-full px-2 py-1 my-block-focus"
              v-model="form.email"
            />
          </div>
          <div></div>
          <button
            class="bg-blue-600 rounded-lg p-3 w-full text-white my-text-content hover:bg-blue-400 my-block-focus"
            @click="register()"
          >
            R E G I S T E R
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "../helpers/Alert";
import axios from "axios";
export default {
  data() {
    return {
      isPassword: false,
      isConPassword: false,
      hoverImage: false,
      form: {
        username: "",
        password: "",
        confirm_password: "",
        email: "",
        profile:
          "https://ga.berkeley.edu/wp-content/uploads/2015/08/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
      },
      image:
        "https://i.pinimg.com/originals/20/79/03/2079033abc8314be554f9d24f562a199.jpg",
    };
  },
  methods: {
    register() {
      let payload = this.form;
      axios.post("/user")
      Alert.mixin("success", "Signed in successfully");
    },
    addProfile(e) {
      console.log(e.type);
      let files = null;
      if (e.type === "drop") {
        files = e.dataTransfer.files;
      } else if (e.type === "change") {
        files = e.target.files;
      }

      if (files) {
        this.form.profile = URL.createObjectURL(files[0]);
      }
    },
  },
};
</script>

<style></style>
