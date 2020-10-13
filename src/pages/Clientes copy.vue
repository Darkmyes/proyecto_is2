<template>
  <div class="centrado">
    <v-data-table :headers="headers" :items="clientes" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="font-weight-bold">Clientes</v-toolbar-title>
            <v-divider class="mx-4" inset vertical ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark class="mb-2" v-bind="attrs" v-on="on">
                Agregar
                <v-icon right  dark> mdi-plus </v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline font-weight-bold">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.cedula"
                        label="Cédula"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.celular"
                        label="# Celular"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.nombres"
                        label="Nombres"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.apellidos"
                        label="Apellidos"
                      ></v-text-field>
                    </v-col>                  
                    <v-col cols="12" sm="12" md="12">
                      <v-text-field
                        v-model="editedItem.direccion"
                        label="Dirección"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1 white--text" @click="save" >
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
  export default {
    name: 'Productos',
    data: () => ({
        dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Cédula',
          align: 'start',
          sortable: false,
          value: 'cedula',
        },
        { text: 'Nombres', value: 'nombres' },
        { text: 'Apellidos', value: 'apellidos' },
        { text: '# Celular', value: 'celular' },
        { text: 'Dirección', value: 'direccion' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
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
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Cliente' : 'Editar Cliente'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
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
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.clientes[this.editedIndex], this.editedItem)
        } else {
          this.clientes.push(this.editedItem)
        }
        this.close()
      },
    }
  }
</script>
