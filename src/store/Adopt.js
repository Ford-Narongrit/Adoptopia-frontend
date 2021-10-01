import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import Header from "@/helpers/Header";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    adopts: "",
  },
  getters: {
    adopts: (state) => state.adopts,
  },
  mutations: {
    fetchAdopts(state, adopts) {
      state.adopts = adopts;
    },
  },
  actions: {
    async getAdopts({ commit }) {
      let header = Header.getHeaders({ Accept: "application/json" });
      let res = await Axios.get("/adopt", header);
      console.log("in getAdopts", res);
      commit("fetchAdopts", res.data);
      return res;
    },
  },
  modules: {},
});
