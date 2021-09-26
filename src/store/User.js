import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
Vue.use(Vuex);

let auth_key = process.env.VUE_APP_AUTH_KEY;

function getApiHeader() {
  let auth = JSON.parse(localStorage.getItem(auth_key));
  if (auth.access_token !== "") {
    return {
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    };
  }
  return null;
}

export default new Vuex.Store({
  state: {
    user: "",
    jwt: "",
    isAuthen: JSON.parse(localStorage.getItem(auth_key)) ? true : false,
  },
  getters: {
    user: (state) => state.user,
    jwt: (state) => state.jwt,
    isAuthen: (state) => state.isAuthen
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
      localStorage.removeItem(auth_key);
      commit("logoutSuccess");
      return {
        success: true,
        message: "logout successful",
      };
    },
    async getMe({ commit }) {
      let res = await Axios.post(`/auth/me`, null, getApiHeader());
      commit("userStore", res.data);
      return res;
    },
  },
  modules: {},
});
