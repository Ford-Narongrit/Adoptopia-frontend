import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import Header from "@/helpers/Header";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ota_adops_list: [],
  },
  getters: {
    ota_adops_list: (state) => state.ota_adops_list,
  },
  mutations: {
    fetchOta_Adops_list(state, ota_adops_list) {
      state.ota_adops_list = ota_adops_list;
    },
  },
  actions: {
    async getOta_Adops_list({ commit }) {
      try {
        let header = Header.getHeaders({ Accept: "application/json" });
        let res = await Axios.get("/ota-sug", header);
        commit("fetchOta_Adops_list", res.data);
        return res;
      } catch (error) {
        throw error;
      }
    },
  },
  modules: {},
});
