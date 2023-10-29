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
      :key="shelf.id" v-for="(shelf) in shelves"
      cols="12"
    >
      <bay-card :shelf="shelf" /> 
    </v-col>
  </v-row>
</template>