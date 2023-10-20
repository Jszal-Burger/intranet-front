<template>
  <VForm class="fill-height" @submit.prevent="setUserInformations">
    <VContainer fluid class="fill-height">
      <VRow no-gutters align="center" justify="center" class="fill-height">
        <VCol cols="12" md="6" lg="6" sm="6" align="center" justify="center">
          <v-avatar
            v-if="!loading"
            class="mb-10"
            :image="url"
            size="80"
            :color="!url ? 'purple-darken-3' : ''"
          >
            <span v-if="!url" class="text-h3">{{ user.initials }}</span>
          </v-avatar>
          <v-progress-circular
            v-if="loading"
            :size="70"
            :width="7"
            color="blue"
            indeterminate
          ></v-progress-circular>
          <VRow v-else no-gutters align="center" justify="center">
            <VCol class="px-5" cols="12" md="6">
              <label class="label text-grey-darken-2" for="email"
                >Email
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      v-bind="props"
                      icon="mdi-help-circle-outline"
                      size="small"
                    ></v-icon>
                  </template>
                  Email de l'utilisateur.
                </v-tooltip></label
              >
              <VTextField
                v-model="user.email"
                density="compact"
                placeholder="Entrer votre email"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                id="email"
                name="email"
                type="email"
              />
              <label class="label text-grey-darken-2" for="firstname"
                >Prénom
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      v-bind="props"
                      icon="mdi-help-circle-outline"
                      size="small"
                    ></v-icon>
                  </template>
                  Prénom de l'utilisateur.
                </v-tooltip></label
              >
              <VTextField
                v-model="user.firstName"
                density="compact"
                placeholder="Entrer votre prénom"
                prepend-inner-icon="mdi-shield-account-outline"
                variant="outlined"
                id="firstname"
                name="firstname"
                type="firstname"
              />
              <label class="label text-grey-darken-2" for="phone"
                >Téléphone
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      v-bind="props"
                      icon="mdi-help-circle-outline"
                      size="small"
                    ></v-icon>
                  </template>
                  Numéro de téléphone de l'utilisateur.
                </v-tooltip></label
              >
              <VTextField
                v-model="user.phone"
                density="compact"
                placeholder="Entrer votre numéro de téléphone"
                prepend-inner-icon="mdi-phone-outline"
                variant="outlined"
                id="phone"
                name="phone"
                type="phone"
              />
            </VCol>
            <VCol class="px-5" cols="12" md="6">
              <label class="label text-grey-darken-2" for="firstname"
                >Avatar
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      v-bind="props"
                      icon="mdi-help-circle-outline"
                      size="small"
                    ></v-icon>
                  </template>
                  Avatar/Image de l'utilisateur.
                </v-tooltip></label
              >
              <v-file-input
                @change="Preview_image"
                v-model="image"
                variant="outlined"
                prepend-icon=""
                density="compact"
              >
              </v-file-input>
              <label class="label text-grey-darken-2" for="lastname"
                >Nom de famille
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      v-bind="props"
                      icon="mdi-help-circle-outline"
                      size="small"
                    ></v-icon>
                  </template>
                  Nom de famille de l'utilisateur.
                </v-tooltip></label
              >
              <VTextField
                v-model="user.lastName"
                density="compact"
                placeholder="Entrer votre nom de famille"
                prepend-inner-icon="mdi-shield-account-outline"
                variant="outlined"
                id="lastname"
                name="lastname"
                type="lastname"
              />
              <label class="label text-grey-darken-2" for="phoneInterne"
                >Téléphone interne
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      v-bind="props"
                      icon="mdi-help-circle-outline"
                      size="small"
                    ></v-icon>
                  </template>
                  Numéro de téléphone interne de l'utilisateur.
                </v-tooltip></label
              >
              <VTextField
                v-model="user.phoneInterne"
                density="compact"
                placeholder="Entrer votre numéro de téléphone interne"
                prepend-inner-icon="mdi-phone-outline"
                variant="outlined"
                id="phoneInterne"
                name="phoneInterne"
                type="phoneInterne"
              />
            </VCol>
            <v-card-text>
              <label class="text-grey-darken-2" for="roles"
                >Rôles
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      v-bind="props"
                      icon="mdi-help-circle-outline"
                      size="small"
                      class="ml-1"
                    ></v-icon>
                  </template>
                  Choix des rôles de l'utilisateur.
                </v-tooltip></label
              >
              <v-chip-group v-model="user.roles" column multiple>
                <v-chip
                  color="purple-darken-3"
                  class="text-purple-darken-3"
                  filter
                  value="ROLE_USER"
                  variant="outlined"
                >
                  Utilisateur
                </v-chip>
                <v-chip
                  color="red-darken-1"
                  class="text-red-darken-1"
                  filter
                  value="ROLE_ADMIN"
                  variant="outlined"
                >
                  Administrateur
                </v-chip>
                <v-chip
                  color="indigo-accent-4"
                  class="text-indigo-accent-4"
                  filter
                  value="ROLE_KORDO"
                  variant="outlined"
                >
                  Kordo
                </v-chip>
                <v-chip
                  color="green-darken-1"
                  class="text-green-darken-1"
                  filter
                  value="ROLE_JARDIPOLYS"
                  variant="outlined"
                >
                  Jardipolys
                </v-chip>
                <v-chip
                  color="black"
                  class="text-black"
                  filter
                  value="ROLE_GRAD"
                  variant="outlined"
                >
                  Grad
                </v-chip>
                <v-chip
                  color="black"
                  class="text-black"
                  filter
                  value="ROLE_GRAD_DIRECTEUR"
                  variant="outlined"
                >
                  Directeur Grad
                </v-chip>
                <v-chip
                  color="black"
                  class="text-black"
                  filter
                  value="ROLE_GRAD_MANAGER_PRO"
                  variant="outlined"
                >
                  Manager Grad Pro
                </v-chip>
                <v-chip
                  color="black"
                  class="text-black"
                  filter
                  value="ROLE_GRAD_PRO"
                  variant="outlined"
                >
                  Grad Pro
                </v-chip>
                <v-chip
                  color="black"
                  class="text-black"
                  filter
                  value="ROLE_GRAD_MANAGER_WEB"
                  variant="outlined"
                >
                  Manager Grad Web
                </v-chip>
                <v-chip
                  color="black"
                  class="text-black"
                  filter
                  value="ROLE_GRAD_WEB"
                  variant="outlined"
                >
                  Grad Web
                </v-chip>
                <v-chip
                  color="black"
                  class="text-black"
                  filter
                  value="ROLE_GRAD_MANAGER_PRODUCTION"
                  variant="outlined"
                >
                  Manager Grad Production
                </v-chip>
                <v-chip
                  color="black"
                  class="text-black"
                  filter
                  value="ROLE_GRAD_PRODUCTION"
                  variant="outlined"
                >
                  Grad Production
                </v-chip>
                <v-chip
                  color="black"
                  class="text-black"
                  filter
                  value="ROLE_GRAD_MANAGER_R&D"
                  variant="outlined"
                >
                  Manager Grad R&D
                </v-chip>
                <v-chip
                  color="black"
                  class="text-black"
                  filter
                  value="ROLE_GRAD_R&D"
                  variant="outlined"
                >
                  Grad R&D
                </v-chip>
                <v-chip
                  color="black"
                  class="text-black"
                  filter
                  value="ROLE_GRAD_MANAGER_ACHETEUR"
                  variant="outlined"
                >
                  Manager Grad Acheteur
                </v-chip>
                <v-chip
                  color="black"
                  class="text-black"
                  filter
                  value="ROLE_GRAD_ACHETEUR"
                  variant="outlined"
                >
                  Grad Acheteur
                </v-chip>
                <v-chip
                  color="black"
                  class="text-black"
                  filter
                  value="ROLE_GRAD_MANAGER_EXPEDITION"
                  variant="outlined"
                >
                  Manager Grad Expédition
                </v-chip>
                <v-chip
                  color="black"
                  class="text-black"
                  filter
                  value="ROLE_GRAD_EXPEDITION"
                  variant="outlined"
                >
                  Grad Expédition
                </v-chip>
              </v-chip-group>
            </v-card-text>
            <v-switch v-model="user.isActive" color="success" inset>
              <template v-slot:label>
                Actif
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      v-bind="props"
                      icon="mdi-help-circle-outline"
                      size="small"
                      class="ml-1"
                    ></v-icon>
                  </template>
                  Activé ou non l'utilisateur.
                </v-tooltip>
              </template>
            </v-switch>
            <VBtn
              type="submit"
              block
              min-height="44"
              variant="outlined"
              color="blue"
              >Envoyer</VBtn
            >
          </VRow>
        </VCol>
      </VRow>
    </VContainer>
  </VForm>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useLoginStore } from "@/store/login";
import { useOtherStore } from "@/store/other";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

const loginStore = useLoginStore();
const otherStore = useOtherStore();
const user = ref([]);
const loading = ref(true);
const url = ref(null);
const image = ref(null);
const route = useRoute();
const router = useRouter();

const Preview_image = () => {
  url.value = URL.createObjectURL(image.value[0]);
};
const setUserInformations = (event) => {
  loading.value = true;
  axios
    .patch("/api/users/" + route.params.id, user.value, {
      headers: {
        "Content-Type": "application/merge-patch+json",
        Authorization: "Bearer " + loginStore.token,
      },
    })
    .then(function (response) {
      loading.value = false;
      // console.log(response);
    })
    .catch(function (error) {
      loading.value = false;
      otherStore.snackBar.showSnackBar = true;
      otherStore.snackBar.text = error.code + " : " + error.message;
      console.log(error);
    });
};

axios
  .get("/api/users/" + route.params.id, {
    headers: {
      Authorization: "Bearer " + loginStore.token,
    },
  })
  .then(function (response) {
    user.value = response.data;
    loading.value = false;
    // console.log(response);
  })
  .catch(function (error) {
    router.push({ name: "ErrorView" });
    loading.value = false;
  });
</script>
