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
      <q-card style="min-width:280px;">
        <q-card-section>
          <div class="text-h6"> {{formTitle}} </div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input v-model="editedItem.cedula" type="text" label="Cédula"/>
          <q-input v-model="editedItem.apellidos" type="text" label="Apellidos"/>
          <q-input v-model="editedItem.nombres" type="text" label="Nombres"/>
          <q-input v-model="editedItem.direccion" type="text" label="Dirección"/>
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
      { name: 'nombres', label: 'Nombres', field: 'nombres' },
      { name: 'descripción', label: 'Apellidos', field: 'apellidos' },
      { name: 'celular', label: 'Celular', field: 'celular' },
      { name: 'direccion', label: 'Dirección', field: 'direccion' }
    ],
    confirmEliminar: false,
    clientes: [],
    editedIndex: -1,
    editedItem: {
      cedula: '',
      nombres: '',
      apellidos: '',
      celular: '',
      direccion: ''
    },
    defaultItem: {
      cedula: '',
      nombres: '',
      apellidos: '',
      celular: '',
      direccion: ''
    }
  }),

  computed: {
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

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.clientes = [
        {
          cedula: '1314876580',
          nombres: 'Franklin Andreé',
          apellidos: 'Cuenca Meza',
          celular: '0981319488',
          direccion: 'Calle Oswaldo Loor y Benjamin Carrión'
        },
        {
          cedula: '1324876580',
          nombres: 'Washington Ali',
          apellidos: 'Cedeño Cedeño',
          celular: '0981319488',
          direccion: 'Calle Oswaldo Loor y Benjamin Carrión'
        },
        {
          cedula: '1334876580',
          nombres: 'Fraadasdé',
          apellidos: 'Cueadasdeza',
          celular: '0981319488',
          direccion: 'Calle Oswaldo Loor y Benjamin Carrión'
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
