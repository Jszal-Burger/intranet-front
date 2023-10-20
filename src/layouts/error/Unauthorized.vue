<template>
  <v-app>
    <unauthorized1 v-if="resultat == 'Unauthorized1'"></unauthorized1>
    <unauthorized2 v-else-if="resultat == 'Unauthorized2'"></unauthorized2>
    <unauthorized3 v-else-if="resultat == 'Unauthorized3'"></unauthorized3>
  </v-app>
</template>

<script setup>
import Unauthorized1 from "@/components/error/unauthorized/Unauthorized1.vue";
import Unauthorized2 from "@/components/error/unauthorized/Unauthorized2.vue";
import Unauthorized3 from "@/components/error/unauthorized/Unauthorized3.vue";

const possibilites = ["Unauthorized1", "Unauthorized2", "Unauthorized3"];
const indiceAleatoire = Math.floor(Math.random() * possibilites.length);
const resultat = possibilites[indiceAleatoire];
</script>
