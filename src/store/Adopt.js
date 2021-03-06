import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import Header from "@/helpers/Header";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    adopts_list: [],
    adopt: {},
  },
  getters: {
    adopts_list: (state) => state.adopts_list,
    adopt: (state) => state.adopt,
  },
  mutations: {
    fetchAdopts_list(state, adopts_list) {
      state.adopts_list = adopts_list;
    },
    fetchAdopt(state, adopt) {
      state.adopt = adopt;
    },
  },
  actions: {
    async getAdopts_list({ commit }) {
      try {
        let header = Header.getHeaders({ Accept: "application/json" });
        let res = await Axios.get("/adopt", header);
        commit("fetchAdopts_list", res.data);
        return res;
      } catch (error) {
        throw error;
      }
    },
    async getAdopt_id({ commit }, id) {
      try {
        let header = Header.getHeaders();
        let res = await Axios.get(`/adopt/${id}`, header);
        commit("fetchAdopt", res.data);
        return res;
      } catch (error) {
        throw error;
      }
    },
    async getUserAdops({ commit }, username) {
      try {
        let header = Header.getHeaders({ Accept: "application/json" });
        let res = await Axios.get(`/adops/${username}`, header);
        commit("fetchAdopts_list", res.data);
        return res;
      } catch (error) {
        throw error;
      }
    },
  },
  modules: {},
});
