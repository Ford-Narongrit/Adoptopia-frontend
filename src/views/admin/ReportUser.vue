<template>
  <div>
    <div class="flex justify-center text-7xl my-8 text-white">Report User</div>
    <div class="bg-white m-3 rounded-md p-3 space-y-3">
      <table class="w-full">
        <thead class="w-full">
          <tr
            class="my-text-content text-gray-900 bg-gray-300 uppercase border-b border"
          >
            <th class="px-4 py-3">No.</th>
            <th class="px-4 py-3">user</th>
            <th class="px-4 py-3">description</th>
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
                :to="`/${report.user.username}/home`"
                class="block hover:underline"
              >
                {{ report.user.username }}
              </router-link>
            </th>
            <th class="px-4 py-3">{{ report.description }}</th>
            <th class="px-4 py-3">
              <router-link
                :to="`/${report.report_by.username}/home`"
                class="block hover:underline"
              >
                {{ report.report_by.username }}
              </router-link>
            </th>
            <th class="px-4 py-3">{{ getFormatTime(report.created_at) }}</th>
            <th class="py-2 mx-auto">
              <button
                v-if="!report.user.banned"
                class="px-4 py-1 rounded-lg bg-red-400 hover:bg-red-500"
                @click="banUser(report.user.id)"
              >
                BAN
              </button>
              <button
                v-if="report.user.banned"
                class="px-4 py-1 rounded-lg bg-gray-400 hover:bg-gray-500"
                @click="unBanUser(report.user.id)"
              >
                BANNED
              </button>
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
    this.fetchReportUser();
  },
  methods: {
    async fetchReportUser() {
      try {
        let res = await ReportStore.dispatch("fetchUserReport");
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
    async banUser(id) {
      this.reports.forEach((report) => {
        if (report.user.id == id) {
          report.user.banned = true;
        }
      });
      let res = await ReportStore.dispatch("ban", id);
    },
    async unBanUser(id) {
      this.reports.forEach((report) => {
        if (report.user.id == id) {
          report.user.banned = false;
        }
      });
      let res = await ReportStore.dispatch("unBan", id);
    },
  },
};
</script>

<style></style>
