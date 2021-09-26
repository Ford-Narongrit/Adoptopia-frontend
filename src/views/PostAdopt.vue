<template>
  <div class="w-full">
    <div class="mt-8 mb-6 ml-8 text-white text-3xl">Post</div>
    <div class="flex">
      <div class="w-2/3 h-full px-16 py-5 flex justify-center item-center">
        <div class="w-3/4 h-80 bg-green-500 relative">
          <div class="flex justify-center items-center h-full"></div>
        </div>
      </div>

      <div class="w-2/3">
        <div class=" justify-center h-full bg-shark-500">
          <div class="ml-8">
            <!-- Name -->
            <div class="space-y-1 w-4/5 flex justify-evenly mb-4">
              <label
                for="name"
                class="my-text-content w-32 items-center flex text-white "
                >Name:
              </label>
              <input
                type="text"
                placeholder="Name"
                class="my-text-content rounded-lg w-2/3 px-2 py-1 my-block-focus"
                v-model="form.name"
              />
            </div>

            <!--Catagory -->
            <div class="space-y-1 w-4/5 flex justify-evenly mb-4">
              <label
                for="catagory"
                class="my-text-content w-32 items-center flex text-white"
                >Catagory:
              </label>
              <select
                v-model="form.catagory"
                class="my-text-content rounded-lg w-2/3 px-2 py-1 my-block-focus"
              >
                <option disabled value="">Please select a catagory</option>
                <!-- Auction, OTA, DTA, SP -->
                <option v-for="(catagory, index) in categories" :key="index">{{
                  catagory
                }}</option>
              </select>
            </div>

            <!--Agreement -->
            <div class="space-y-1 w-4/5 flex justify-evenly mb-4">
              <label for="agreement" class="my-text-content w-32 text-white"
                >Agreement:
              </label>
              <textarea
                type="text"
                placeholder="Agreement"
                class="my-text-content rounded-lg w-2/3 h-40 px-2 py-1 my-block-focus"
                v-model="form.agreement"
              />
            </div>

            <!--Type -->
            <div class="space-y-1 w-4/5 flex justify-evenly mb-4">
              <label
                for="type"
                class="my-text-content w-32 items-center flex text-white"
                >Type:
              </label>
              <select
                v-model="form.type"
                class="my-text-content rounded-lg w-2/3 px-2 py-1 my-block-focus "
              >
                <option disabled value="">Please select a type</option>
                <!-- Auction, OTA, DTA, SP -->
                <option
                  v-for="(type, index) in types"
                  :key="index"
                  class="hover:bg-black"
                  >{{ type }}</option
                >
              </select>
            </div>

            <div class="space-y-1 w-4/5 flex justify-evenly mb-4">
              <label
                for="type"
                class="my-text-content w-32 items-center flex text-white"
              >
              </label>
              <div class="flex w-2/3 justify-between">
                <div class="relative">
                  <input
                    type="text"
                    class="my-text-content rounded-lg w-28 px-2 pl-10 py-1 my-block-focus text-right"
                    v-model="form.sb"
                  />
                  <div class="my-text-content absolute top-1 left-1">SB:</div>
                </div>
                <div class="relative">
                  <input
                    type="text"
                    class="my-text-content rounded-lg w-28 px-2 pl-10 py-1 my-block-focus text-right"
                    v-model="form.ab"
                  />
                  <div class="my-text-content absolute top-1 left-1">AB:</div>
                </div>
                <div class="relative">
                  <input
                    type="text"
                    class="my-text-content rounded-lg w-28 px-2 pl-10 py-1 my-block-focus text-right"
                    v-model="form.bid"
                  />
                  <div class="my-text-content absolute top-1 left-1">BID:</div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <button
        class="bg-blue-600 rounded-full w-28 p-2 text-white my-text-content hover:bg-blue-400 my-block-focus"
        @click="post()"
      >
        Post
      </button>
    </div>
  </div>
</template>

<script>
import Alert from "../helpers/Alert";

export default {
  data() {
    return {
      categories: ["A", "B", "C"],
      types: ["Auction", "OTA", "DTA", "SP"],
      form: {
        name: "",
        catagory: "",
        agreement: "",
        type: "",
        sb: "",
        ab: "",
        bid: "",
        images: [],
      },
    };
  },
  methods: {
    post() {
      console.log(this.form);
      Alert.mixin("success", "Post successfully");
    },
  },
};
</script>

<style lang="scss" scoped></style>>
