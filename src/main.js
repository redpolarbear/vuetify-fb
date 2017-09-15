import Vue from 'vue'
import Vuetify from 'vuetify'
import * as firebase from 'firebase'
import Vuelidate from 'vuelidate'

import './stylus/main.styl'
import App from './App'
import router from './router'
import { store } from './store'

Vue.use(Vuetify)
Vue.use(Vuelidate)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    const fbConfig = {
      apiKey: 'AIzaSyBp-VoO4yMdfcJjHeG8rCLYmlovp634-yY',
      authDomain: 'vuejs-firebase-01-55b96.firebaseapp.com',
      databaseURL: 'https://vuejs-firebase-01-55b96.firebaseio.com',
      projectId: 'vuejs-firebase-01-55b96',
      storageBucket: 'vuejs-firebase-01-55b96.appspot.com',
      messagingSenderId: '687212823219'
    }
    firebase.initializeApp(fbConfig)
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
})
