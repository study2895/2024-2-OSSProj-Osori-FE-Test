import { createStore } from 'vuex'
import auth from './modules/auth.js' // auth 모듈 import

const store = createStore({
  modules: {
    auth // auth 모듈 등록
  }
})

export default store
