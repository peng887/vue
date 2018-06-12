import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    appMarginBooleans:true
  },
  mutations:{
    changeaAppMarginBooleans(state){
      state.appMarginBooleans=!state.appMarginBooleans;
    }
  }
})

export default store
