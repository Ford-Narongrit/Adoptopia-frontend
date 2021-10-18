<template>
  <div class="flex overflow-hidden h-screen">
    <div
      class="md:w-1/2 xl:w-2/3 md:block hidden bg-center bg-cover"
      :style="{ backgroundImage: 'url(' + `${image}` + ')' }"
    ></div>
    <div class="md:w-1/2 xl:w-1/3 w-full">
      <div class="flex justify-center items-center h-full bg-shark-500">
        <div class="rounded-lg p-5 space-y-4 w-3/4">
          <img src="@/assets/logo.png" alt="logo" class="h-20 mx-auto" />
          <div class="my-text-title text-center text-white">LOGIN</div>

          <!-- username -->
          <div class="space-y-1">
            <label for="username" class="my-text-content block text-white"
              >Username or Email</label
            >
            <input
              type="text"
              placeholder="Username or Email"
              class="my-text-content rounded-lg w-full px-2 py-1 "
              :class="errors.validate ? 'my-block-error ' : 'my-block-focus'"
              v-model="form.username"
            />
            <div v-if="errors.validate" class="text-red-400">
              {{ errors.validate[0] }}
            </div>
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
                :class="errors.password ? 'my-block-error ' : 'my-block-focus'"
                v-model="form.password"
              />
              <button
                class="absolute my-auto h-full right-0 px-1 rounded-lg bg-transparent"
                @click="isSee = !isSee"
                tabindex="-1"
              >
                <font-awesome-icon
                  :icon="isSee ? 'eye' : 'eye-slash'"
                  class="my-text-content text-black"
                />
              </button>
            </div>
            <div v-if="errors.password" class="text-red-400">
              {{ errors.password[0] }}
            </div>
          </div>

          <!-- signUp -->
          <div class="my-text-base text-white">
            Don't have an account ?
            <router-link
              to="/register"
              class="text-blue-500 hover:underline"
              tabindex="-1"
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
import Alert from "@/helpers/Alert";
import UserStore from "@/store/User";
export default {
  data() {
    return {
      isSee: false,
      errors: [],
      form: {
        username: "",
        password: "",
      },
      image:
        "https://i.pinimg.com/originals/20/79/03/2079033abc8314be554f9d24f562a199.jpg",
    };
  },
  methods: {
    async login() {
      let payload = {
        validate: this.form.username,
        password: this.form.password,
      };
      try {
        let res = await UserStore.dispatch("login", payload);
        Alert.mixin("success", "Login successful");
        this.$router.push(`/${res.data.user.username}/home`);
      } catch (error) {
        this.errors = error.response.data.validator;
        Alert.window("error", "Sign in Failed", error.response.data.error);
        console.error(error.response);
      }
    },
  },
};
</script>

<style></style>
