<script setup>
const shelves = [
  {
    id: 1,
    name: 'Beverage',
    image: '/images/beverages.jpg',
    products: 0,
  },
  {
    id: 2,
    name: 'Snacks',
    image: '/images/snacks.webp',
    products: 0,
  },
  {
    id: 3,
    name: 'Cosmetics',
    image: '/images/cosmetics.jpg',
    products: 0,
  },
  {
    id: 4,
    name: 'Foods',
    image: '/images/foods.jpg',
    products: 0,
  }
]
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