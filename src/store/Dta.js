import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import Header from "@/helpers/Header";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dta_image_list: [],
  },
  getters: {
    dta_image_list: (state) => state.dta_image_list,
  },
  mutations: {
    fetchDta_image_list(state, dta_image_list) {
      state.dta_image_list = dta_image_list;
    },
  },
  actions: {
    async getDta_image_list({ commit }) {
      try {
        let header = Header.getHeaders({ Accept: "application/json" });
        let res = await Axios.get("/dta-sug", header);
        commit("fetchDta_image_list", res.data);
        return res;
      } catch (error) {
        throw error;
      }
    },
  },
  modules: {},
});
