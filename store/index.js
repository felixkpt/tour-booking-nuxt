// store/index.js
export const state = () => ({
    user: null,
    token: null,
  });
  
  export const mutations = {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    LOGOUT(state) {
      state.user = null;
      state.token = null;
    }
  };
  
  export const actions = {
    async login({ commit }, credentials) {
      const { token, user } = await this.$axios.$post('/login', credentials);
      commit('SET_TOKEN', token);
      commit('SET_USER', user);
    },
    async register({ commit }, userDetails) {
      const { token, user } = await this.$axios.$post('/register', userDetails);
      commit('SET_TOKEN', token);
      commit('SET_USER', user);
    },
    logout({ commit }) {
      this.$axios.post('/logout');
      commit('LOGOUT');
    }
  };
  