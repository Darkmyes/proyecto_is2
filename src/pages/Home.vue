<template>
  <div>
    <v-card
      dark
    >
      <div>
        <v-card-title class="headline">
          Proyecto de Medio Ciclo | Ingeniería de Software
        </v-card-title>
        <v-card-subtitle class="headline text-center">
          Integrantes
        </v-card-subtitle>
      </div>
    </v-card>
    <v-timeline
        align-top
        :dense="$vuetify.breakpoint.smAndDown"
      >      
      <v-timeline-item
        color="pink"
        small
      >
        <v-row class="pt-1">
          <v-avatar>
            <img src="roddo.jpg">
          </v-avatar>
          <v-col cols="10">
            <strong>Andrade Molina Roddy Andrés</strong>
          </v-col>
        </v-row>
      </v-timeline-item>

      <v-timeline-item
        color="teal lighten-3"
        small
      >
        <v-row class="pt-1" justify="end">
          <v-col cols="10" class="text-right">
            <strong>Cedeño Cedeño Washington Ali</strong>
          </v-col>
          <v-avatar>
            <img src="wacho.jpeg">
          </v-avatar>
        </v-row>
      </v-timeline-item>

      <v-timeline-item
        color="pink"
        small
      >
        <v-row class="pt-1">
          <v-avatar>
            <img src="limber.jpeg">
          </v-avatar>
          <v-col cols="10">
            <strong>Cedeño Zambrano Limber Alejandro</strong>
          </v-col>
        </v-row>
      </v-timeline-item>

      <v-timeline-item
        color="teal lighten-3"
        small
      >
        <v-row class="pt-1" justify="end">
          <v-col cols="10" class="text-right">
            <strong>Cuenca Meza Franklin Andreé</strong>
          </v-col>
          <v-avatar>
            <img src="frank.jpeg">
          </v-avatar>
        </v-row>
      </v-timeline-item>

      <v-timeline-item
        color="pink"
        small
      >
        <v-row class="pt-1">
          <v-avatar>
            <img src="cris.jpg">
          </v-avatar>
          <v-col cols="10">
            <strong>Vera Almeida Cristhian</strong>
          </v-col>
        </v-row>
      </v-timeline-item>
    </v-timeline>
    <v-card
      dark
    >
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title class="headline">
            Descripción del Proyecto de Fin de Ciclo
          </v-card-title>
          
          <v-card-subtitle>
            <p>
              Para este proyecto, se pide que a partir del enunciado Requisitos de Sistemas de Ventas (anexo 1) y seleccionando cualquier entorno y tecnología de desarrollo, se pide automatizar 3 procesos (por ejemplo: registro del cliente, solicitud de pedido, registro de proveedores, registro de convenio, ingreso de productos… o cualquier otro proceso que identifique) para lo cual se pide:
            </p>
            <ol>
              <li>Descripción de datos a ser ingresados al sistema</li>
              <li>Descripción de las operaciones a ser realizadas por cada pantalla</li>
              <li>Descripción de los flujos de trabajo realizados por el sistema (a base)</li>
              <li>Descripción de los reportes o salidas</li>
              <li>Definición de quién puede ingresar datos al sistema</li>
              <li>Script de la base de datos</li>
              <li>Código fuente</li>
              <li>Manual de usuario</li>
            </ol>
            <p>
              Además, se valorará temas de diseño (maquetaciones y CSS) y usabilidad que tendrán que aplicar en base a sus experiencias y conocimientos.
            </p>
          </v-card-subtitle>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data: () => ({
      
  }),
  }
</script>
