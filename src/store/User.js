import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import Header from "@/helpers/Header";
Vue.use(Vuex);

let auth_key = process.env.VUE_APP_AUTH_KEY;
const user_id = 0;

export default new Vuex.Store({
  state: {
    user: "",
    jwt: "",
    users: [],
    isAuthen: JSON.parse(localStorage.getItem(auth_key)) ? true : false,
  },
  getters: {
    user: (state) => state.user,
    jwt: (state) => state.jwt,
    users: (state) => state.users,
    isAuthen: (state) => state.isAuthen,
  },
  mutations: {
    loginSuccess(state, { user, jwt }) {
      state.user = user;
      state.jwt = jwt;
      state.isAuthen = true;
    },
    logoutSuccess(state) {
      state.user = "";
      state.jwt = "";
      state.isAuthen = false;
      state.isAdmin = false;
    },
    userStore(state, { user }) {
      state.user = user;
      state.isAuthen = true;
    },
    fetchUser(state, users) {
      state.users = users;
    },
  },
  actions: {
    async login({ commit }, payload) {
      try {
        let res = await Axios.post("/auth/login", payload);
        let body = {
          user: res.data.user,
          jwt: res.data.access_token,
        };
        localStorage.setItem(auth_key, JSON.stringify(res.data));
        commit("loginSuccess", body);
        return res;
      } catch (error) {
        throw error;
      }
    },
    async logout({ commit }) {
      let header = Header.getHeaders();
      try {
        let res = await Axios.post("/auth/logout", null, header);
        localStorage.removeItem(auth_key);
        commit("logoutSuccess");
        return res;
      } catch (error) {
        throw error;
      }
    },
    async register({ commit }, payload) {
      let header = Header.getHeaders({
        "Content-Type": "multipart/form-data",
      });
      try {
        let res = await Axios.post("/auth/register", payload, header);
        return res;
      } catch (error) {
        throw error;
      }
    },
    async getMe({ commit }) {
      let header = Header.getHeaders({ Accept: "application/json" });
      let res = await Axios.post("/auth/me", null, header);
      commit("userStore", res.data);
      this.user_id = res.data.id;
      return res;
    },
    async getUser({ commit }, slug) {
      let header = Header.getHeaders({ Accept: "application/json" });
      let res = await Axios.get(`/user/${slug}`, header);
      
      return res;
    },
    async getAllUsers({ commit }) {
      try {
        let header = Header.getHeaders({ Accept: "application/json" });
        let res = await Axios.get("/user", header);
        commit("fetchUser", res.data);
      } catch (error) {
        throw error;
      }
    },
    async getAllBanUsers({ commit }) {
      try {
        let header = Header.getHeaders({ Accept: "application/json" });
        let res = await Axios.get("/ban/user", header);
        return res;
      } catch (error) {
        throw error;
      }
    },
    async update({ commit }, payload) {
      let header = Header.getHeaders({
        "Content-Type": "multipart/form-data",
      });
      let res = await Axios.post(`/auth/update`, payload, header);
      commit("userStore", res.data);
      return res;
    },
    async isFollow({ commit }, id) {
      try {
        let header = Header.getHeaders({ Accept: "application/json" });
        let res = await Axios.get(`/follow/${id}`, header);
        return res;
      } catch (error) {
        throw error;
      }
    },
    async follow({ commit }, id) {
      try {
        let header = Header.getHeaders({ Accept: "application/json" });
        let res = await Axios.post(`/follow/${id}`, null, header);
        return res;
      } catch (error) {
        throw error;
      }
    },
    async unFollow({ commit }, id) {
      try {
        let header = Header.getHeaders({ Accept: "application/json" });
        let res = await Axios.delete(`/follow/${id}`, header);
        return res;
      } catch (error) {
        throw error;
      }
    },
  },
  modules: {},
});
