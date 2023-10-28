<script setup>
import { useShelvesStore } from '@/stores/shelves'
const store = useShelvesStore();
const shelves = store.shelves;
useHead({
  title: 'Tildi Assignment',
  meta: [
    { name: 'description', content: 'Tildi assignment project.' }
  ],
});
</script>

<template>
  <v-row>
    <v-col
      :key="shelve.id" v-for="(shelve) in shelves"
      cols="12"
    >
      <bay-card :shelve="shelve" /> 
    </v-col>
  </v-row>
</template>