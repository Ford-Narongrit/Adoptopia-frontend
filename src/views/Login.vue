<template>
  <div class="flex overflow-hidden h-screen">
    <div class="md:w-1/2 xl:w-2/3 md:block hidden bg-center bg-cover"
    :style="{ backgroundImage: 'url(' + `${image}` + ')' }">
    </div>
    <div class="md:w-1/2 xl:w-1/3 w-full">
      <div class="flex justify-center items-center h-full bg-shark-500">
        <div class="rounded-lg p-5 space-y-4 w-3/4">
          <img src="../assets/logo.png" alt="logo" class="h-20 mx-auto" />
          <div class="my-text-title text-center text-white">LOGIN</div>

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
            <label for="username" class="my-text-content block text-white"
              >Password</label
            >
            <div class="relative">
              <input
                :type="isSee ? 'text' : 'password'"
                placeholder="Password"
                class="my-text-content rounded-lg w-full px-2 py-1 my-block-focus"
                v-model="form.password"
              />
              <button
                class="absolute my-auto h-full right-0 p-1 my-10 rounded-lg bg-white"
                @click="isSee = !isSee"
              >
                <font-awesome-icon
                  :icon="isSee ? 'eye' : 'eye-slash'"
                  class="my-text-content text-black"
                />
              </button>
            </div>
          </div>

          <!-- signUp -->
          <div class="my-text-base text-white">
            Don't have an account ?
            <router-link to="/register" class="text-blue-500 hover:underline"
              >Sign Up</router-link
            >
          </div>
          <button
            class="bg-blue-600 rounded-lg p-3 w-full text-white my-text-content hover:bg-blue-400 my-block-focus"
            @click="login()"
          >
            L O G I N
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "../helpers/Alert";
export default {
  data() {
    return {
      isSee: false,
      form: {
        username: "",
        password: "",
      },
      image:
        "https://i.pinimg.com/originals/20/79/03/2079033abc8314be554f9d24f562a199.jpg",
    };
  },
  methods: {
    login() {
        // alert(this.form.username + "  " + this.form.password);
        Alert.mixin("success", "Signed in successfully");
    },
  },
};
</script>

<style></style>
