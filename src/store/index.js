import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      status: '',
      token: localStorage.getItem('ravyynToken') || '',
      user : {},
      passwordResetKey: null
    },
    getters,
    mutations,
    actions
  });


export default store;