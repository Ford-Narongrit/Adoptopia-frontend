<template>
  <div>
    <div class="flex justify-center text-7xl my-8 text-white">Report Post</div>
    <div class="bg-white m-3 rounded-md p-3 space-y-3">
      <table class="w-full">
        <thead class="w-full">
          <tr
            class="my-text-content text-gray-900 bg-gray-300 uppercase border-b border"
          >
            <th class="px-4 py-3">No.</th>
            <th class="px-4 py-3">POST ID</th>
            <th class="px-4 py-3">ADOP NAME</th>
            <th class="px-4 py-3">description</th>
            <th class="px-4 py-3">type</th>
            <th class="px-4 py-3">Reproted by</th>
            <th class="px-4 py-3">reported at</th>
            <th class="px-4 py-3 w-36"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(report, index) in reports"
            :key="index"
            class="my-text-base text-gray-900 bg-gray-100 hover:bg-gray-200"
          >
            <th class="px-4 py-3">{{ index + 1 }}</th>
            <th class="px-4 py-3">
              <router-link
                :to="`/sale/${report.post.id}`"
                class="block hover:underline"
              >
                {{ report.post.id }}
              </router-link>
            </th>
            <th class="px-4 py-3">{{ report.post.adopt.name }}</th>
            <th class="px-4 py-3">{{ report.description }}</th>
            <th class="px-4 py-3">
              <span
                class="px-2 py-1 rounded-lg"
                :class="colorType(report.post.type)"
              >
                {{ report.post.type }}
              </span>
            </th>
            <th class="px-4 py-3">
              <router-link
                :to="`/${report.report_by.username}/home`"
                class="block hover:underline"
              >
                {{ report.report_by.username }}
              </router-link>
            </th>
            <th class="px-4 py-3">{{ getFormatTime(report.created_at) }}</th>
            <th class="px-4 py-2 mx-auto">
              <button
                v-if="!report.post.deleted_at"
                class="px-4 py-1 rounded-lg bg-red-400 hover:bg-red-500"
                @click="deletePost(report.post.id)"
              >
                DELETE
              </button>
              <div
                v-if="report.post.deleted_at"
                class="px-4 py-1 rounded-lg bg-gray-400 cursor-default"
              >
                DELETED
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ReportStore from "@/store/Report";
import moment from "moment";
export default {
  data() {
    return {
      reports: [],
    };
  },
  mounted() {
    this.fetchReportPost();
  },
  methods: {
    async fetchReportPost() {
      try {
        let res = await ReportStore.dispatch("fetchPostReport");
        this.reports = res.data;
      } catch (error) {
        console.error(error.response);
      }
    },
    getImagePath(image) {
      return process.env.VUE_APP_APIURL + image;
    },
    getFormatTime(time) {
      return moment(time).format("l");
    },
    async deletePost(id) {
      try {
        let res = await ReportStore.dispatch("deletePost", id);
      } catch (error) {
        console.error(error);
      }
    },
    colorType(colorType) {
      switch (colorType) {
        case "sale":
          return "bg-red-400";
        case "dta":
          return "bg-green-400";
        case "ota":
          return "bg-yellow-400";
        default:
          return "bg-white";
      }
    },
  },
};
</script>

<style></style>
