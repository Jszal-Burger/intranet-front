<template>
  <router-view />
</template>

<script setup>
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
</script>
