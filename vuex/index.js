import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state(){
    return {
      current_search_content:'',
      current_search_num:'',
      current_router:'index'
    }
  },
  mutations:{
    searchContent: (state,val) => {
      state.current_search_content = val;
    },
    searchNum: (state,val) => {
      state.current_search_num = val;
    },
    goRouter: (state,val) => {
      state.current_router = val;
    }
  },
  getters:{
    getRouter:(state) => {
      return state.current_router
    }
  }
});


