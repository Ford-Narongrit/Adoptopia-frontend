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
  mutations: {
    storeReport(state, data) {
      state.reports = data;
    },
  },
  actions: {
    async fetchUserReport({ commit }) {
      try {
        let header = Header.getHeaders({ Accept: "application/json" });
        let res = await Axios.get(`/report/user`, header);
        commit("storeReport", res.data);
        return res;
      } catch (error) {
        throw error;
      }
    },
    async fetchPostReport({ commit }) {
      try {
        let header = Header.getHeaders({ Accept: "application/json" });
        let res = await Axios.get(`/report/post`, header);
        commit("storeReport", res.data);
        return res;
      } catch (error) {
        throw error;
      }
    },
    async sentReportUser({ commit }, payload) {
      try {
        let header = Header.getHeaders({ Accept: "application/json" });
        let res = await Axios.post(`/report/user`, payload, header);
        return res;
      } catch (error) {
        throw error;
      }
    },
    async sentReportPost({ commit }, payload) {
      try {
        let header = Header.getHeaders({ Accept: "application/json" });
        let res = await Axios.post(`/report/post`, payload, header);
        return res;
      } catch (error) {
        throw error;
      }
    },
    async ban({ commit }, id) {
      try {
        let header = Header.getHeaders({ Accept: "application/json" });
        let res = await Axios.post(`/ban`, { id: id }, header);
        return res;
      } catch (error) {
        throw error;
      }
    },
    async unBan({ commit }, id) {
      try {
        let header = Header.getHeaders({ Accept: "application/json" });
        let res = await Axios.post(`/unban`, { id: id }, header);
        return res;
      } catch (error) {
        throw error;
      }
    },
    async deletePost({ commit }, id) {
      try {
        let header = Header.getHeaders({ Accept: "application/json" });
        let res = await Axios.delete(`/trade/delete/${id}`, header);
        return res;
      } catch (error) {
        throw error;
      }
    },
  },
  modules: {},
});
