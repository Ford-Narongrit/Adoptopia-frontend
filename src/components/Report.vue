<template>
  <div>
    <div v-if="user">
      <button
        v-if="!user.isOwner"
        class="border-4 border-gray-500 h-12 w-12 rounded-full bg-gray-400 hover:bg-yellow-700 transition"
        @click="showMeun = true"
      >
        <font-awesome-icon icon="flag" class="text-xl text-white" />
      </button>
    </div>
    <div v-if="post">
        <!-- v-if="!post.isOwner" -->
      <button
        class="border-4 border-gray-500 h-12 w-12 rounded-full bg-gray-400 hover:bg-yellow-700 transition"
        @click="showMeun = true"
      >
        <font-awesome-icon icon="flag" class="text-xl text-white" />
      </button>
    </div>
    <!-- popup -->
    <div
      class="fixed h-screen w-screen inset-0 flex justify-center items-center"
      v-if="showMeun"
    >
      <button
        class="fixed h-screen w-screen bg-black inset-0 opacity-30 cursor-default"
        @click="showMeun = false"
        style="z-index: 1;"
      ></button>
      <!-- form report -->
      <div class="bg-white px-5 py-3 rounded-md space-y-2" style="z-index: 1;">
        <div class="my-text-subtitle font-bold text-center">
          Report an issue
        </div>
        <div class="border-b-2 border-gray-400 mx-2 my-1"></div>
        <div class="my-text-base">
          Help us understand the problem. What issue
          <span class="font-bold" v-if="type === 'User'"
            >with @{{ user.username }}
          </span>
          are you reporting?
        </div>
        <button
          class="my-text-content rounded-lg block w-full px-2 py-3 hover:bg-gray-300 my-block-focus text-left"
          v-for="(report, index) in report_list"
          :key="index"
          @click="sendReport(report)"
        >
          {{ report }}
        </button>
        <input
          type="text"
          placeholder="Other problem."
          class="my-text-content rounded-lg border-2 w-full px-2 py-3 my-block-focus"
          v-model="otherReport"
        />
        <div class="text-right space-x-2">
          <button
            class="bg-red-500 rounded-lg p-3 text-white my-text-content hover:bg-red-600 my-block-error-none-border"
            @click="cancelReport()"
          >
            cancel
          </button>
          <button
            class="bg-blue-500 rounded-lg p-3 text-white my-text-content hover:bg-blue-600 my-block-focus"
            @click="sendReport(otherReport)"
          >
            send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReportStore from "@/store/Report";
import Alert from "@/helpers/Alert";
export default {
  data() {
    return {
      showMeun: false,
      otherReport: "",
    };
  },
  props: {
    user: {
      type: Object,
      default: null,
    },
    post: {
      type: Object,
      default: null,
    },
    report_list: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "User",
    },
  },
  methods: {
    async sendReport(message) {
      let payload = {
        description: message,
        user_id: this.user ? this.user.id: null,
        post_id: this.post ? this.post.id: null,
      };
      let res = await ReportStore.dispatch(`sentReport${this.type}`, payload);
      Alert.mixin("success", "Reported success");
      this.clearMenu();
    },

    cancelReport() {
      this.clearMenu();
    },
    clearMenu() {
      this.otherReport = "";
      this.showMeun = false;
    },
  },
};
</script>

<style></style>
