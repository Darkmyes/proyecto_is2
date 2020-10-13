<template>
  <q-page class="full-height">
    <div class="q-pa-md">
      <div class="text-center text-bold text-h4">Productos</div>
      <q-table
        :grid=" $q.screen.lt.sm"
        :data="productos"
        :columns="columns"
        row-key="id"
        :filter="filter"
        selection="multiple"
        :selected.sync="selected"
      >
        <template v-slot:top>
          <q-btn class="q-mr-sm" color="primary" dense flat :disable="loading || !(selected.length == 1)" icon="edit" @click="intentarActualizar"/>
          <q-btn class="q-mr-sm" color="red-5" dense flat :disable="loading || !(selected.length > 0)" icon="delete" @click="intentarEliminar"/>
          <q-btn class="q-mr-sm" color="primary" icon="add" label="Agregar" @click="dialog = true"/><q-space />
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
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
          <q-input v-model="editedItem.nombre" type="text" label="Nombre"/>
          <q-input
            v-model="editedItem.descripcion"
            label="Descripción"
            autogrow
            type="textarea"
          />
          <div class="row justify-between">
            <q-input v-model="editedItem.precio" type="number" label="Precio" />
            <q-separator spaced inset vertical dark />
            <q-input v-model="editedItem.stock" type="number" label="Stock" />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancelar" flat color="primary" v-close-popup />
          <q-btn label="Guardar" color="primary" v-close-popup @click="eliminar"/>
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
        field: 'id'
      },
      { name: 'Nombre', label: 'Nombre', field: 'nombre' },
      { name: 'Descripción', label: 'Descripcion', field: 'descripcion' },
      { name: 'Precio', format: (val, row) => `$ ${(val).toFixed(2)}`, label: 'Precio', field: 'precio' },
      { name: 'Stock', label: 'Stock', field: 'stock' }
    ],
    confirmEliminar: false,
    productos: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0
    },
    defaultItem: {
      id: 0,
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0
    }
  }),

  computed: {
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

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.productos = [
        {
          id: 0,
          nombre: 'Frozen Yogurt',
          descripcion: 'Yogurt muy rico y delicioso',
          precio: 6.0,
          stock: 24
        },
        {
          id: 1,
          nombre: 'Frozen Yogurt',
          descripcion: 'Yogurt muy rico y delicioso',
          precio: 6.0,
          stock: 24
        },
        {
          id: 2,
          nombre: 'Frozen Yogurt',
          descripcion: 'Yogurt muy rico y delicioso',
          precio: 6.0,
          stock: 24
        }
      ]
    },
    registrar () {
      /* if (!this.validarNuevaCategoria()) {
        this.errorModal = true
      } else {
        this.registrarCategoria({ axios: this.$axios, categoria: this.nuevaCategoria })
          .then(res => {
            console.log('si')
            this.limpiarNuevaCategoria()
            this.listarCategoriasAdmin(this.$axios)
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
      } */
    },
    actualizar () {
      /* if (!this.validarUpdCategoria()) {
        this.errorModal = true
      } else {
        this.actualizarCategoria({ axios: this.$axios, categoria: this.updCategoria })
          .then(res => {
            this.selected = []
            this.dialogActualizar = false
            this.updCategoria = null
            this.listarCategoriasAdmin(this.$axios)

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
      } */
    },
    intentarActualizar () {
      this.editedItem = Object.assign({}, this.selected[0])
      this.editando = true
      this.dialog = true
    },
    eliminar () {
      // const peticiones = []
      /* this.selected.forEach(e => {
        peticiones.push(this.eliminarCategoria({ axios: this.$axios, id: e.id }))
      })

      Promise.all(peticiones)
        .then((res) => {
          res.forEach(item => {
            this.listarCategoriasAdmin(this.$axios)
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
            this.listarCategoriasAdmin(this.$axios)
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
        }) */
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
