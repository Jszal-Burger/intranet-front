<template>
  <v-app>
    <error1 v-if="resultat == 'Error1'"></error1>
    <error2 v-else-if="resultat == 'Error2'"></error2>
    <error3 v-else-if="resultat == 'Error3'"></error3>
  </v-app>
</template>

<script setup>
import Error1 from "@/components/error/404/Error1.vue";
import Error2 from "@/components/error/404/Error2.vue";
import Error3 from "@/components/error/404/Error3.vue";

const possibilites = ["Error1", "Error2", "Error3"];
const indiceAleatoire = Math.floor(Math.random() * possibilites.length);
const resultat = possibilites[indiceAleatoire];
</script>
