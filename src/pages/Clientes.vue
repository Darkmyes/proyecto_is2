<template>
  <q-page class="full-height">
    <div class="q-pa-md">
      <div class="text-center text-bold text-h4">Clientes</div>
      <q-table
        :grid=" $q.screen.lt.sm"
        :data="clientes"
        :columns="columns"
        row-key="cedula"
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
      <q-card style="min-width:280px;">
        <q-card-section>
          <div class="text-h6"> {{formTitle}} </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input v-model="editedItem.cedula" type="text" label="Cédula"/>
          <q-input v-model="editedItem.lastname" type="text" label="Apellidos"/>
          <q-input v-model="editedItem.name" type="text" label="Nombres"/>
          <q-input v-model="editedItem.direccion" type="text" label="Dirección"/>
          <q-input v-model="editedItem.email" type="text" label="Email"/>
          <q-input v-model="editedItem.celular" type="text" label="# Celular"/>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancelar" flat color="primary" v-close-popup @click="close"/>
          <q-btn label="Guardar" color="primary" v-close-popup @click="save"/>
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
  name: 'clientes',
  data: () => ({
    dialog: false,
    dialogDelete: false,
    filter: '',
    editando: false,
    loading: false,
    selected: [],
    columns: [
      {
        name: 'cedula',
        label: 'Cédula',
        align: 'start',
        sortable: false,
        field: 'cedula'
      },
      { name: 'nombres', label: 'Nombres', field: 'name' },
      { name: 'descripción', label: 'Apellidos', field: 'lastname' },
      { name: 'email', label: 'Email', field: 'email' },
      { name: 'celular', label: 'Celular', field: 'celular' },
      { name: 'direccion', label: 'Dirección', field: 'direccion' }
    ],
    confirmEliminar: false,
    editedIndex: -1,
    editedItem: {
      cedula: '',
      name: '',
      lastname: '',
      celular: '',
      direccion: '',
      email: ''
    },
    defaultItem: {
      cedula: '',
      name: '',
      lastname: '',
      celular: '',
      direccion: '',
      email: ''
    }
  }),

  computed: {
    ...mapState('clientes', ['clientes']),
    formTitle () {
      return this.editando ? 'Editar Cliente' : 'Nuevo Cliente'
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
    this.listarClientes(this.$axios)
  },
  methods: {
    ...mapActions('clientes', ['listarClientes', 'registrarCliente', 'actualizarCliente', 'eliminarCliente']),
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
        this.registrarCliente({ axios: this.$axios, cliente: this.editedItem })
          .then(res => {
            this.limpiarDatos()
            this.listarClientes(this.$axios)
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
        this.actualizarCliente({ axios: this.$axios, cliente: this.editedItem })
          .then(res => {
            this.selected = []
            this.dialogActualizar = false
            this.updCliente = null
            this.listarClientes(this.$axios)

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
        peticiones.push(this.eliminarCliente({ axios: this.$axios, id: e.cedula }))
      })

      Promise.all(peticiones)
        .then((res) => {
          res.forEach(item => {
            this.listarClientes(this.$axios)
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
            this.listarClientes(this.$axios)
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
      this.editedIndex = this.clientes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.clientes.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.clientes.splice(this.editedIndex, 1)
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
      if (!this.editando) {
        this.registrar()
      } else {
        this.actualizar()
      }
      this.dialog = false
    }
  }
}
</script>
