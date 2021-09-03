<template>
  <div class="flex overflow-hidden h-screen">
    <div class="w-2/3">
      <img :src="image" alt="" class="w-full bg-center bg-cover" />
    </div>
    <div class="w-1/3">
      <div class="flex justify-center items-center h-full bg-black">
        <div class="rounded-lg p-5 space-y-4 w-3/4">
          <img src="../assets/logo.png" alt="logo" class="h-20 mx-auto" />
          <div class="text-4xl text-center text-white">LOGIN</div>

          <!-- username -->
          <div class="space-y-1">
            <label for="username" class="text-xl block text-white"
              >Username</label
            >
            <input
              type="text"
              placeholder="Username"
              class="text-xl rounded-lg w-full px-2 py-1 focus:outline-none focus:ring ring-white ring-offset-4 focus:ring-offset-blue-700"
              v-model="form.username"
            />
          </div>

          <!-- password -->
          <div class="space-y-1">
            <label for="username" class="text-xl block text-white"
              >Password</label
            >
            <div class="relative">
              <input
                :type="isSee ? 'text' : 'password'"
                placeholder="Password"
                class="text-xl rounded-lg w-full px-2 py-1 focus:outline-none focus:ring ring-white ring-offset-4 focus:ring-offset-blue-700"
                v-model="form.password"
              />
              <button
                class="absolute my-auto h-full right-0 p-1 my-10 rounded-lg bg-white"
                @click="isSee = !isSee"
              >
                <font-awesome-icon
                  :icon="isSee ? 'eye' : 'eye-slash'"
                  class="text-xl text-black"
                />
              </button>
            </div>
          </div>

          <!-- signUp -->
          <div class="text-md text-white">
            Don't have an account ?
            <router-link to="/register" class="text-blue-500 hover:underline"
              >Sign Up</router-link
            >
          </div>
          <button
            class="bg-blue-600 rounded-lg p-3 w-full text-white text-xl hover:bg-blue-400 focus:outline-none focus:ring ring-white ring-offset-4 focus:ring-offset-blue-700"
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
