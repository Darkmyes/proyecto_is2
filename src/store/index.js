import Vue from 'vue'
import Vuex from 'vuex'

import productos from './productos'
import clientes from './clientes'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      productos,
      clientes
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
