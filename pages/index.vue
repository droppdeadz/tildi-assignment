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
      <v-card :to="`/shelves/${shelve.id}`" elevation="20">
        <div class="relative">
          <div class="after:absolute after:inset-0 after:bg-black/50">
            <v-img
              :src="shelve.image"
              height="200"
              cover
            ></v-img>
          </div>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-extrabold uppercase text-5xl z-10">
            {{ shelve.name }}
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>