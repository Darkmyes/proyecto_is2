<template>
  <q-page class="full-height">
    <div class="q-pa-md">
      <div class="text-center text-bold text-h4">Productos</div>
      <q-table
        :grid=" $q.screen.lt.sm"
        :data="productos"
        :columns="columns"
        row-key="id_producto"
        :filter="filter"
        selection="multiple"
        :selected.sync="selected"
      >
        <template v-slot:top>
          <q-btn class="q-mr-sm" color="primary" dense flat :disable="loading || !(selected.length == 1)" icon="edit" @click="intentarActualizar"/>
          <q-btn class="q-mr-sm" color="red-5" dense flat :disable="loading || !(selected.length > 0)" icon="delete" @click="intentarEliminar"/>
          <q-btn class="q-mr-sm" color="primary" icon="add" label="Agregar" @click="dialog = true"/><q-space />
          <!-- <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input> -->
        </template>
      </q-table>
    </div>

    <!-- REGISTRAR ACTUALIZAR -->
    <q-dialog v-model="dialog" transition-show="jump-down" transition-hide="jump-up">
      <q-card>
        <q-card-section>
          <div class="text-h6"> {{this.editando ? 'Editar Producto' : 'Nuevo Producto'}} </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input v-model="editedItem.name" type="text" label="Nombre"/>
          <q-input
            v-model="editedItem.descripcion"
            label="Descripción"
            autogrow
            type="textarea"
          />
          <q-input v-model="editedItem.cantidad" type="number" label="Cantidad" />
          <div class="row justify-between">
            <q-input v-model="editedItem.precio_c_u" type="number" label="Precio Unidad" />
            <q-separator spaced inset vertical dark />
            <q-input v-model="editedItem.precio_doce" type="number" label="Precio Docena" />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancelar" flat color="primary" v-close-popup />
          <q-btn label="Guardar" color="primary" v-close-popup @click="regMod"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- ELIMINAR -->
    <q-dialog v-model="confirmEliminar" persistent transition-show="jump-down" transition-hide="jump-up">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alerta</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          ¿Estás seguro de que quieres Eliminar?
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancelar" flat color="primary" v-close-popup />
          <q-btn label="Sí, Eliminar" color="primary" v-close-popup @click="eliminar"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Productos',
  data: () => ({
    dialog: false,
    dialogDelete: false,
    filter: '',
    editando: false,
    loading: false,
    selected: [],
    columns: [
      {
        name: 'id',
        label: 'Id',
        align: 'start',
        sortable: false,
        field: 'id_producto'
      },
      { name: 'Nombre', label: 'Nombre', field: 'name' },
      { name: 'Descripción', label: 'Descripcion', field: 'descripcion' },
      { name: 'Cantidad', label: 'Cantidad', field: 'cantidad' },
      { name: 'Precio Unitario', format: (val, row) => `$ ${parseFloat(val).toFixed(2)}`, label: 'Precio Unitario', field: 'precio_c_u' },
      { name: 'Precio Docena', format: (val, row) => `$ ${parseFloat(val).toFixed(2)}`, label: 'Precio Docena', field: 'precio_doce' }
    ],
    confirmEliminar: false,
    // productos: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      name: '',
      descripcion: '',
      cantidad: 0,
      precio_c_u: 0,
      precio_doce: 0
    },
    defaultItem: {
      id: 0,
      name: '',
      descripcion: '',
      cantidad: 0,
      precio_c_u: 0,
      precio_doce: 0
    }
  }),

  computed: {
    ...mapState('productos', ['productos']),
    formTitle () {
      return this.editando ? 'Editar Producto' : 'Nuevo Producto'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    }
  },

  mounted () {
    this.listarProductos(this.$axios)
  },

  methods: {
    ...mapActions('productos', ['listarProductos', 'registrarProducto', 'actualizarProducto', 'eliminarProducto']),
    validar () {
      if (this.editedItem.nombre === '') {
        return false
      }
      if (this.editedItem.descripcion === '') {
        return false
      }
      if (this.editedItem.precio_c_u === 0) {
        return false
      }
      if (this.editedItem.precio_doce === 0) {
        return false
      }
      return true
    },
    regMod () {
      if (this.editando) {
        this.actualizar()
      } else {
        this.registrar()
      }
    },
    limpiarDatos () {
      this.editedItem = Object.assign({}, this.defaultItem)
    },
    registrar () {
      if (!this.validar()) {
        this.errorModal = true
      } else {
        this.registrarProducto({ axios: this.$axios, producto: this.editedItem })
          .then(res => {
            this.limpiarDatos()
            this.listarProductos(this.$axios)
            this.$q.notify({
              type: 'positive',
              message: 'Se registró con éxito',
              position: 'center',
              actions: [
                { label: 'X', color: 'white', handler: () => { } }
              ]
            })
          })
          .catch(err => {
            console.log(err)
            this.$q.notify({
              type: 'negative',
              message: 'Hubieron errores durante el registro',
              position: 'center',
              actions: [
                { label: 'X', color: 'white', handler: () => { } }
              ]
            })
          })
      }
    },
    actualizar () {
      if (!this.validar()) {
        this.errorModal = true
      } else {
        this.actualizarProducto({ axios: this.$axios, producto: this.editedItem })
          .then(res => {
            this.selected = []
            this.dialogActualizar = false
            this.updProducto = null
            this.listarProductos(this.$axios)

            this.$q.notify({
              type: 'positive',
              message: 'Se actualizó con éxito',
              position: 'center',
              actions: [
                { label: 'X', color: 'white', handler: () => { } }
              ]
            })
          })
          .catch(err => {
            console.log(err)
            this.$q.notify({
              type: 'negative',
              message: 'Hubieron errores durante la actualización',
              position: 'center',
              actions: [
                { label: 'X', color: 'white', handler: () => { } }
              ]
            })
          })
      }
    },
    intentarActualizar () {
      this.editedItem = Object.assign({}, this.selected[0])
      this.editando = true
      this.dialog = true
    },
    eliminar () {
      const peticiones = []
      this.selected.forEach(e => {
        peticiones.push(this.eliminarProducto({ axios: this.$axios, id: e.id_producto }))
      })

      Promise.all(peticiones)
        .then((res) => {
          res.forEach(item => {
            this.listarProductos(this.$axios)
            this.selected = []

            this.$q.notify({
              type: 'positive',
              message: 'Se eliminó con éxito los registros',
              position: 'center',
              actions: [
                { label: 'X', color: 'white', handler: () => { } }
              ]
            })
          })
        })
        .catch(err => {
          err.forEach(item => {
            this.listarProductos(this.$axios)
            this.selected = []
            this.$q.notify({
              type: 'negative',
              message: 'Hubieron errores durante la eliminación',
              position: 'center',
              actions: [
                { label: 'X', color: 'white', handler: () => { } }
              ]
            })
          })
        })
    },
    intentarEliminar () {
      this.confirmEliminar = true
    },

    editItem (item) {
      this.editedIndex = this.productos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.productos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.productos.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.editando = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      })
    },

    save () {
      if (this.editando) {
        this.registrar()
      } else {
        this.actualizar()
      }
      this.dialog = false
    }
  }
}
</script>
