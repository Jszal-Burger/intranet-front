<template>
  <v-app>
    <default-app-bar />
    <default-menu />

    <default-view />
  </v-app>
</template>

<script setup>
import DefaultAppBar from "@/components/AppBarComponent.vue";
import DefaultMenu from "@/components/SideMenuComponent.vue";
import DefaultView from "@/components/ViewComponent.vue";
</script>
