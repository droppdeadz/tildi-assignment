<script setup>
const props = defineProps({
  shelf: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <v-card :to="`/shelves/${shelf.id}`" elevation="20">
    <div class="relative">
      <div class="after:absolute after:inset-0 after:bg-black/50">
        <v-img
          :src="shelf.image"
          height="200"
          cover
        ></v-img>
      </div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-extrabold uppercase text-5xl z-10">
        {{ shelf.name }}
      </div>
    </div>
  </v-card>
</template>