<script setup>
import { storeToRefs } from 'pinia'
import { useLoaderStore } from '@/stores/loader'

const store = useLoaderStore();
const { getLoader } = storeToRefs(store);

const interval = ref(null);
const loaderProgress = ref(0);

const loader = computed(() => getLoader.value);

const onShowLoader = () => {
  store.showLoader();
  interval.value = setInterval(() => {
    if (loaderProgress.value >= 100) {
      store.hideLoader();
    }

    const temp = loaderProgress.value + Math.floor(Math.random() * 100);

    if (temp > 100) {
      loaderProgress.value = 100;
    } else {
      loaderProgress.value = temp;
    }
  }, 500);
}

watch(loader, (value) => {
  if (value) {
    onShowLoader();
  } else {
    clearInterval(interval.value);
    setTimeout(() => {
      loaderProgress.value = 0;
    }, 1000);
  }
});

</script>

<template>
  <v-app>
    <v-layout>
      <v-app-bar density="compact" elevation="1">
        <v-app-bar-title>
          <nuxt-link to="/">
            TILDI Assignment
          </nuxt-link>
        </v-app-bar-title>
      </v-app-bar>
      <v-main>
        <v-container>
          <div class="max-w-screen-md mx-auto">
            <NuxtPage />
          </div>
        </v-container>
      </v-main>
    </v-layout>
    <v-overlay v-model="loader" class="align-center justify-center">
      <v-progress-circular
        :rotate="360"
        :size="100"
        :width="15"
        :model-value="loaderProgress"
        color="success"
      >
        <template v-slot:default> {{ loaderProgress }} % </template>
      </v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<style>
.v-overlay__scrim {
  opacity: 0.75 !important;
}
</style>