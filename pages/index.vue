<script setup>
import { useShelvesStore } from '@/stores/shelves'
const store = useShelvesStore();
const shelves = store.shelves;
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