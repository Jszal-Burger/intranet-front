<template>
  <VContainer fluid class="fill-height bg-8177E8">
    <VRow no-gutters align="center" justify="center" class="fill-height">
      <VCol
        align="center"
        justify="center"
        class="fill-height"
        cols="12"
        sm="6"
      >
        <VImg src="@/assets/images/error/error2.jpg" aspect-ratio="1.7"></VImg>
        <div class="text-center">
          <h1
            class="text-h4 text-sm-h4 text-md-h1 text-grey-darken-4 font-weight-bold"
          >
            Page not found
          </h1>
          <p class="text-h6 text-grey-darken-4 mt-5 font-weight-bold">
            The requested URL was not found on this server
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
                class="text-cyan-darken-4 text-subtitle-2 text-md-h6"
                color="cyan-accent-3"
                size="x-large"
                variant="flat"
                to="/login"
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
.bg-8177E8 {
  background-color: #8177e8;
}
h1 {
  text-shadow: 5px 4px 0px rgba(0, 0, 0, 0.25);
}
</style>
