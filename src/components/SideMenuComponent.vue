<template>
  <v-navigation-drawer permanent width="220">
    <v-list
      density="compact"
      nav
      v-for="(itemMenu, index) in menu"
      :key="index"
    >
      <!-- <v-list-item
        :prepend-icon="itemMenu.icon"
        :title="itemMenu.text"
        :value="itemMenu.value"
        :to="itemMenu.route"
        :active="itemMenu.value == $route.name ? true : false"
      ></v-list-item> -->
      <!-- <v-list density="compact" nav v-if="itemMenu.value == $route.name">
        <v-list-item
          v-for="itemSousMenu in getSousMenu(itemMenu.value)"
          :key="itemSousMenu.message"
          :title="itemSousMenu.text"
          :value="itemSousMenu.value"
          :to="itemSousMenu.route"
          :active="itemSousMenu.value == $route.name ? true : false"
        ></v-list-item>
      </v-list> -->
      <v-list-group :prepend-icon="itemMenu.icon" :value="itemMenu.value">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" :title="itemMenu.text"></v-list-item>
        </template>
        <v-list-item
          v-for="(itemSousMenu, index) in getSousMenu(itemMenu.value)"
          :key="index"
          :title="itemSousMenu.text"
          :value="itemSousMenu.value"
          :to="itemSousMenu.route"
          :active="itemSousMenu.value == $route.name ? true : false"
          :prepend-icon="itemSousMenu.icon"
        ></v-list-item>
      </v-list-group>
      <v-divider v-if="index + 1 !== menu.length" class="my-3"></v-divider>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const getSousMenu = (value) => {
  return sousMenu[value];
};
const menu = [
  {
    icon: "mdi-badge-account-outline",
    text: "Crm",
    value: "crm",
    route: "/crm",
  },
  {
    icon: "mdi-tools",
    text: "Production",
    value: "production",
    route: "/production",
  },
];
const sousMenu = {
  crm: [
    {
      text: "Agenda",
      value: "Agenda",
      route: "/crm/agenda",
      icon: "mdi-notebook",
    },
    {
      text: "Clients",
      value: "Clients",
      route: "/crm/clients",
      icon: "mdi-account-group-outline",
    },
    {
      text: "Leads",
      value: "Leads",
      route: "/crm/leads",
      icon: "mdi-account-group-outline",
    },
    {
      text: "Rapport Visite",
      value: "Rapport visite",
      route: "/crm/rapport-visite",
      icon: "mdi-poll",
    },
  ],
  production: [
    {
      text: "Suivi profeel",
      value: "Suivi profeel",
      route: "/production/suivi-profeel",
      icon: "mdi-fence",
    },
    // { text: "qsd", value: "production-clients", route: "/production/clients" },
    // { text: "s", value: "production-leads", route: "/production/leads" },
  ],
};
</script>
