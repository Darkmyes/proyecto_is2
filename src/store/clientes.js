
export default {
  namespaced: true,
  state () {
    return {
      clientes: []
    }
  },
  getters: {
    //
  },
  mutations: {
    setClientes: (state, cls) => {
      state.clientes = cls
    }
  },
  actions: {
    registrarCliente: ({ commit }, { axios, cliente }) => {
      return new Promise((resolve, reject) => {
        axios.post('/users', {
          cedula: cliente.cedula,
          name: cliente.name,
          lastname: cliente.lastname,
          celular: cliente.celular,
          direccion: cliente.direccion,
          email: cliente.email
        })
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            reject(error.response)
          })
      })
    },
    actualizarCliente: ({ commit }, { axios, cliente }) => {
      return new Promise((resolve, reject) => {
        axios.put('/users/' + cliente.cedula, {
          name: cliente.name,
          lastname: cliente.lastname,
          celular: cliente.celular,
          direccion: cliente.direccion,
          email: cliente.email
        })
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            reject(error.response)
          })
      })
    },
    eliminarCliente: ({ commit }, { axios, id }) => {
      return new Promise((resolve, reject) => {
        axios.delete('/users/' + id)
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            reject(error.response)
          })
      })
    },
    listarClientes: ({ commit }, axios) => {
      return new Promise((resolve, reject) => {
        axios.get('/users')
          .then(function (response) {
            commit('setClientes', response.data.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error.response)
          })
      })
    },
    getCliente: ({ commit }, { axios, id }) => {
      return new Promise((resolve, reject) => {
        axios.get('/users/' + id)
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            reject(error.response)
          })
      })
    }
  }
}
