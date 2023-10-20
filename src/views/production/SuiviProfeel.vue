<template>
  <VContainer fluid>
    <v-data-table :headers="headers" :items="desserts" item-value="name">
      <template v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort }">
        <tr>
          <template v-for="column in columns" :key="column.key">
            <td>
              <span
                class="mr-2 cursor-pointer"
                @click="() => toggleSort(column)"
                >{{ column.title }}</span
              >
              <template v-if="isSorted(column)">
                <v-icon :icon="getSortIcon(column)"></v-icon>
              </template>
              <v-text-field
                class="mt-2"
                :label="column.title"
                variant="outlined"
                @input="(event) => filter(column.key, event, 'input')"
              ></v-text-field>
            </td>
          </template>
        </tr>
      </template>
    </v-data-table>
  </VContainer>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";

const headers = [
  {
    title: "Dessert (100g serving)",
    align: "start",
    key: "name",
    sortable: false,
    removable: false,
  },
  { title: "Calories", key: "calories", removable: true },
  { title: "Fat (g)", key: "fat", removable: true },
  { title: "Carbs (g)", key: "carbs", removable: true },
  { title: "Protein (g)", key: "protein", removable: true },
  { title: "Iron (%)", key: "iron", removable: true },
];

const desserts = ref([
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: 1,
  },
  {
    name: "Ice cream sandwich",
    calories: 159,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: 1,
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: 7,
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: 8,
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: 16,
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: 0,
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: 2,
  },
  {
    name: "Donut",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: 45,
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: 22,
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: 6,
  },
]);

const originalDesserts = ref([]);

const initializeOriginalDesserts = () => {
  originalDesserts.value = [...desserts.value];
};

const filter = (key, value, type) => {
  if (type == "input") {
    if (value.target.value.length === 0) {
      desserts.value = originalDesserts.value;
    }
    if (value.target.value.length > 0) {
      desserts.value = desserts.value.filter((dessert) => {
        if (typeof dessert[key] == "number") {
          return dessert[key].toString().includes(value.target.value);
        } else {
          return dessert[key]
            .toLowerCase()
            .includes(value.target.value.toLowerCase());
        }
      });
    }
  }
};

onBeforeMount(() => {
  // Initialiser les données d'origine au moment de la création du composant
  initializeOriginalDesserts();
});
</script>
