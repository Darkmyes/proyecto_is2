
export default {
  namespaced: true,
  state () {
    return {
      productos: []
    }
  },
  getters: {
    //
  },
  mutations: {
    setProductos: (state, prods) => {
      state.productos = prods
    }
  },
  actions: {
    registrarProducto: ({ commit }, { axios, producto }) => {
      return new Promise((resolve, reject) => {
        axios.post('/productos', {
          name: producto.name,
          descripcion: producto.descripcion,
          cantidad: producto.cantidad,
          precio_c_u: producto.precio_c_u,
          precio_doce: producto.precio_doce
        })
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            reject(error.response)
          })
      })
    },
    actualizarProducto: ({ commit }, { axios, producto }) => {
      return new Promise((resolve, reject) => {
        axios.put('/productos/' + producto.id_producto, {
          name: producto.name,
          descripcion: producto.descripcion,
          cantidad: producto.cantidad,
          precio_c_u: parseFloat(producto.precio_c_u),
          precio_doce: parseFloat(producto.precio_doce)
        })
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            reject(error.response)
          })
      })
    },
    eliminarProducto: ({ commit }, { axios, id }) => {
      return new Promise((resolve, reject) => {
        axios.delete('/productos/' + id)
          .then(function (response) {
            resolve(response)
          })
          .catch(function (error) {
            reject(error.response)
          })
      })
    },
    listarProductos: ({ commit }, axios) => {
      return new Promise((resolve, reject) => {
        axios.get('/productos')
          .then(function (response) {
            commit('setProductos', response.data.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error.response)
          })
      })
    },
    getProducto: ({ commit }, { axios, id }) => {
      return new Promise((resolve, reject) => {
        axios.get('/productos/' + id)
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
