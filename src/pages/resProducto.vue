<template>
  <div class="centrado">
    <v-data-table :headers="headers" :items="productos" sort-by="calories" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="font-weight-bold">Productos</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <q-btn color="primary" icon="add" label="Agregar" @click="on" />
              <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn dark class="mb-2" v-on="on">
                  Agregar
                  <v-icon right dark> mdi-plus </v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title> <span class="headline font-weight-bold">{{ formTitle }}</span> </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="editedItem.nombre"
                          label="Nombre"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="editedItem.descripcion"
                          label="Descripción"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.precio"
                          label="Precio"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.stock"
                          label="Stock"
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
                  <v-btn color="blue darken-1 white--text" @click="save">
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
          text: 'id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Descripción', value: 'descripcion' },
        { text: 'Precio', value: 'precio' },
        { text: 'Stock', value: 'stock' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
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
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Producto' : 'Editar Producto'
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
          Object.assign(this.productos[this.editedIndex], this.editedItem)
        } else {
          this.productos.push(this.editedItem)
        }
        this.close()
      },
    }
  }
</script>
