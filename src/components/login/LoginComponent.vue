<template>
  <VContainer fluid class="fill-height">
    <VRow no-gutters align="center" justify="center" class="fill-height">
      <VCol cols="12" md="6" lg="5" sm="6">
        <VRow no-gutters align="center" justify="center">
          <VCol cols="12" md="6">
            <h1>Connexion</h1>
            <p class="text-medium-emphasis">
              Entrer vos informations pour utiliser l'intranet
            </p>

            <VForm @submit.prevent="authentication" class="mt-7">
              <div v-if="loginType == 'login' || !loginType">
                <div class="mt-1">
                  <label class="label text-grey-darken-2" for="username"
                    >Nom d'utilisateur
                    <v-tooltip location="top">
                      <template v-slot:activator="{ props }">
                        <v-icon
                          v-bind="props"
                          icon="mdi-help-circle-outline"
                          size="small"
                        ></v-icon>
                      </template>
                      Nom d'utilisateur sous la forme première lettre de votre
                      prénom suivi de votre nom de famille complet.
                    </v-tooltip></label
                  >
                  <VTextField
                    v-model="username"
                    density="compact"
                    placeholder="Entrer votre nom d'utilisateur"
                    prepend-inner-icon="mdi-shield-account-outline"
                    variant="outlined"
                    id="username"
                    name="username"
                    type="username"
                  />
                </div>
                <div class="mt-1">
                  <label class="label text-grey-darken-2" for="password"
                    >Mot de passe
                    <v-tooltip location="top">
                      <template v-slot:activator="{ props }">
                        <v-icon
                          v-bind="props"
                          icon="mdi-help-circle-outline"
                          size="small"
                        ></v-icon>
                      </template>
                      Mot de passe qui est le même que pour vous connecter à
                      Windows.
                    </v-tooltip></label
                  >
                  <VTextField
                    :append-inner-icon="
                      visiblePassword ? 'mdi-eye-off' : 'mdi-eye'
                    "
                    :type="visiblePassword ? 'text' : 'password'"
                    density="compact"
                    placeholder="Entrer votre mot de passe"
                    prepend-inner-icon="mdi-lock-outline"
                    variant="outlined"
                    @click:append-inner="visiblePassword = !visiblePassword"
                    v-model="password"
                    id="password"
                    name="password"
                  ></VTextField>
                </div>
              </div>
              <div v-if="loginType == 'matricule'">
                <div class="mt-1">
                  <label class="label text-grey-darken-2" for="matricule"
                    >Matricule
                    <v-tooltip location="top">
                      <template v-slot:activator="{ props }">
                        <v-icon
                          v-bind="props"
                          icon="mdi-help-circle-outline"
                          size="small"
                        ></v-icon>
                      </template>
                      Matricule de production
                    </v-tooltip></label
                  >
                  <VTextField
                    v-model="matricule"
                    density="compact"
                    placeholder="Entrer votre matricule"
                    prepend-inner-icon="mdi-card-account-details-outline"
                    variant="outlined"
                    id="matricule"
                    name="matricule"
                    type="username"
                  />
                </div>
              </div>
              <v-card class="mb-8" color="warning" variant="tonal">
                <v-card-text
                  v-if="
                    loginType == 'login' &&
                    loginError.type == 'login' &&
                    loginError.visible
                  "
                  class="text-medium-emphasis"
                >
                  Nom d'utilisateur ou mot de passe incorrect.
                </v-card-text>
                <v-card-text
                  v-if="
                    loginType == 'matricule' &&
                    loginError.type == 'matricule' &&
                    loginError.visible
                  "
                  class="text-medium-emphasis"
                >
                  Matricule incorrect.
                </v-card-text>
              </v-card>
              <div class="mt-5">
                <VBtn
                  type="submit"
                  block
                  min-height="44"
                  variant="tonal"
                  color="blue"
                  >Connexion</VBtn
                >
              </div>
            </VForm>
            <p class="text-body-2 mt-10">
              <v-switch
                v-model="loginType"
                color="blue"
                true-value="matricule"
                false-value="login"
                inset
              >
                <template v-slot:label>
                  Connexion via matricule
                  <v-tooltip location="top">
                    <template v-slot:activator="{ props }">
                      <v-icon
                        v-bind="props"
                        icon="mdi-help-circle-outline"
                        size="small"
                        class="ml-1"
                      ></v-icon>
                    </template>
                    Change le mode de connexion par une connexion via le
                    matricule uniquement (accès restreint)
                  </v-tooltip>
                </template>
              </v-switch>
            </p>
          </VCol>
        </VRow>
      </VCol>
      <VCol class="hidden-md-and-down fill-height" md="6" lg="7">
        <!--IMG DANS PUBLIC FAIRE /image.png-->
        <VImg
          src="https://wallpaper.dog/large/5557744.jpg"
          cover
          class="h-100 rounded-xl d-flex align-center justify-center"
        >
          <div class="text-center w-50 text-white mx-auto">
            <h2 class="mb-4">Bienvenue sur l'intranet Burger and Cie</h2>
            <p class="mb-2">
              L'intranet de Burger & Cie, votre portail central pour la
              communication, la collaboration et l'accès aux ressources/outils
              essentielles de notre entreprise.
            </p>
            <p>
              Il est conçu pour simplifier la vie de nos employés, améliorer la
              communication, la productivité au sein de l'entreprise et
              renforcer la collaboration. Nous espérons que cette plateforme
              facilitera votre travail au quotidien et contribuera à notre
              succès collectif.
            </p>
          </div>
        </VImg>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useLoginStore } from "@/store/login";
import { useRouter } from "vue-router";
const loginStore = useLoginStore();
const router = useRouter();

const username = ref("");
const matricule = ref("");
const password = ref("");
const loginType = ref("login");
const loginError = ref({
  type: null,
  visible: false,
});
const visiblePassword = ref(false);

const authentication = (event) => {
  if (loginType.value == "login") {
    axios
      .post("/login", {
        type: "login",
        username: username.value,
        password: password.value,
      })
      .then(function (response) {
        loginStore.addToken(response.data);
        router.push("/");
        // console.log(response);
      })
      .catch(function (error) {
        loginError.value.visible = true;
        loginError.value.type = "login";
        console.log(error);
      });
  } else if (loginType.value == "matricule") {
    axios
      .post("/login", {
        type: "matricule",
        matricule: matricule.value,
      })
      .then(function (response) {
        loginStore.addToken(response.data);
        router.push("/");
        // console.log(response);
      })
      .catch(function (error) {
        loginError.value.visible = true;
        loginError.value.type = "matricule";
        console.log(error);
      });
  }
};
</script>
