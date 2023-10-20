<template>
  <VContainer fluid class="fill-height bg-white">
    <VRow no-gutters align="center" justify="center" class="fill-height">
      <VCol
        align="center"
        justify="center"
        class="fill-height"
        cols="12"
        sm="6"
      >
        <VImg
          src="@/assets/images/error/unauthorized1.jpg"
          aspect-ratio="1.7"
        ></VImg>
        <div class="text-center">
          <h1
            class="text-h4 text-sm-h4 text-md-h1 text-grey-darken-4 font-weight-bold"
          >
            Access denied
          </h1>
          <p class="text-h6 text-grey-darken-4 mt-5 font-weight-bold">
            You do not have access to this page or ressource
          </p>
          <VRow
            no-gutters
            align="center"
            justify="center"
            class="fill-height mt-8"
          >
            <VCol
              align="center"
              justify="center"
              class="fill-height pl-sm-16 pr-sm-4 pr-2"
              cols="6"
              sm="6"
            >
              <v-btn
                block
                class="text-white text-subtitle-2 text-md-h6"
                color="light-blue-accent-4"
                size="x-large"
                variant="flat"
                to="login"
              >
                GO HOME
              </v-btn>
            </VCol>
            <VCol
              align="center"
              justify="center"
              class="fill-height pl-sm-4 pr-sm-16 pl-2"
              cols="6"
              sm="6"
            >
              <v-btn
                block
                class="text-grey-darken-4 text-subtitle-2 text-md-h6"
                size="x-large"
                variant="outlined"
                :href="
                  'mailto: helpdesk@burger.fr?subject=Page ' +
                  $route.path +
                  ' not found&body=Bonjour,%0D%0A%0D%0APage non trouvé : ' +
                  $route.path
                "
                target="_blank"
              >
                CONTACT US
              </v-btn>
            </VCol>
          </VRow>
        </div>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup></script>

<style scoped>
h1 {
  text-shadow: 5px 4px 0px rgba(0, 0, 0, 0.25);
}
</style>
