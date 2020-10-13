<template>
  <q-page class="column items-center justify-start q-pa-md">
    <q-card class="my-card dark bg-primary text-white" style="width:100%;">
      <q-card-section>
        <div class="text-h6 text-center">Proyecto de Medio Ciclo | Ingeniería de Software</div>
      </q-card-section>
    </q-card>

    <q-timeline layout="loose" color="secondary">
      <q-timeline-entry heading>Integrantes</q-timeline-entry>

      <q-timeline-entry
        v-for="(persona, i) in integrantes"
        v-bind:key="i"
        :color="persona.color"
        :side="i % 2 == 0 ? 'right' : 'left'"
      >
        <template v-slot:title>
          <div> {{persona.nombre}} </div><q-avatar>
            <img :src="'./imgs/' + persona.img">
          </q-avatar>
        </template>
      </q-timeline-entry>
    </q-timeline>

    <q-card class="my-card dark bg-primary text-white" style="width:100%;">
      <q-card-section>
        <div class="text-h6 text-center">Descripción del Proyecto de Fin de Ciclo</div>
        <div class="text-grey-4">
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
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      integrantes: [
        {
          nombre: 'Andrade Molina Roddy Andrés',
          img: 'roddo.jpg',
          color: 'red'
        },
        {
          nombre: 'Cedeño Cedeño Washington Ali',
          img: 'wacho.jpeg',
          color: 'blue'
        },
        {
          nombre: 'Cedeño Zambrano Limber Alejandro',
          img: 'limber.jpg',
          color: 'orange'
        },
        {
          nombre: 'Cuenca Meza Franklin Andreé',
          img: 'frank.jpeg',
          color: 'black'
        },
        {
          nombre: 'Vera Almeida Cristhian Manuel',
          img: 'cris.jpg',
          color: 'green'
        }
      ]
    }
  }
}
</script>
