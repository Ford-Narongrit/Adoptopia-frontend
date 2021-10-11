import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import Header from "@/helpers/Header";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    post_adops_list: [],
    post_adop: {},
  },
  getters: {
    post_adops_list: (state) => state.post_adops_list,
    post_adop: (state) => state.post_adop,
  },
  mutations: {
    fetchPost_Adops_list(state, post_adops_list) {
      state.post_adops_list = post_adops_list;
    },
    fetchPost_Adop(state, post_adop) {
      state.post_adop = post_adop;
    },
  },
  actions: {
    async getPost_Adops_list({ commit }) {
      try {
        let header = Header.getHeaders({ Accept: "application/json" });
        let res = await Axios.get("/trade-coin", header);
        console.log(res)
        commit("fetchPost_Adops_list", res.data);
        return res;
      } catch (error) {
        throw error;
      }
    },
    async getPost_Adop_id({ commit }, id) {
      try {
        let header = Header.getHeaders();
        let res = await Axios.get(`/trade-coin/${id}`, header);
        commit("fetchPost_Adop", res.data);
        return res;
      } catch (error) {
        throw error;
      }
    },
  },
  modules: {},
});
