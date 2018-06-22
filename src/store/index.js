import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutations'
// import marketId from '../config'

Vue.use(Vuex)

const state = {
  wxid: 1123,//微信公众号唯一id
  userInfo:null,
  userdata:null,
  utm_source:'',
  adverList:[],
  publicfrom:''
}

export default new Vuex.Store({
  state,
  mutations
})
