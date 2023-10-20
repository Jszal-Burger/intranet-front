<template>
  <v-app-bar color="blue">
    <v-btn
      class="mx-2"
      icon="mdi-home-outline"
      size="large"
      value="accueil"
      to="/"
    ></v-btn>
    <v-divider vertical></v-divider>
    <v-toolbar-title>{{ $route.name }}</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-menu min-width="200px" rounded>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-avatar color="purple-darken-3" size="large">
            <span class="text-h5">{{ user.initials }}</span>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <div class="mx-auto text-center">
            <v-avatar color="purple-darken-3">
              <span class="text-h5">{{ user.initials }}</span>
            </v-avatar>
            <h3>{{ user.firstName + " " + user.lastName }}</h3>
            <p class="text-caption mt-1">
              {{ user.email }}
            </p>
            <v-divider class="my-3"></v-divider>
            <v-btn rounded variant="text" :to="'/compte/' + user.id"
              >Compte</v-btn
            >
            <v-divider class="my-3"></v-divider>
            <v-btn rounded variant="text" @click="logout">Deconnexion</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
    <v-snackbar
      v-model="otherStore.snackBar.showSnackBar"
      timeout="3000"
      @update:modelValue="onSnackbarClosed"
    >
      {{ otherStore.snackBar.text }}
    </v-snackbar>
  </v-app-bar>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useLoginStore } from "@/store/login";
import { useOtherStore } from "@/store/other";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const loginStore = useLoginStore();
const otherStore = useOtherStore();
const user = ref([]);
const logout = (event) => {
  axios
    .post("/logout", null, {
      headers: {
        Authorization: "Bearer " + loginStore.token,
      },
    })
    .then(function (response) {
      loginStore.$reset();
      router.push("/login");
      // console.log(response);
    })
    .catch(function (error) {
      loginStore.$reset();
      router.push("/login");
      console.log(error);
    });
};
const onSnackbarClosed = (value) => {
  if (value == false) {
    router.go();
  }
};
onMounted(async () => {
  axios
    .get("/api/users/" + loginStore.user.id, {
      headers: {
        Authorization: "Bearer " + loginStore.token,
      },
    })
    .then(function (response) {
      user.value = response.data;
      // console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
});
</script>
