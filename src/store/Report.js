import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import Header from "@/helpers/Header";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    reports: [],
  },
  getters: {
    reports: (state) => state.reports,
  },
  mutations: {},
  actions: {
    async sentReportUser({ commit }, payload) {
      try {
        let header = Header.getHeaders({ Accept: "application/json" });
        let res = await Axios.post(`/report/user`, payload, header);
        return res;
      } catch (error) {
        throw error;
      }
    },
  },
  modules: {},
});
