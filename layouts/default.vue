<script setup>
import { storeToRefs } from 'pinia'
import { useLoaderStore } from '@/stores/loader'
import { useShelvesStore } from '@/stores/shelves'
import uniqueId from 'lodash/uniqueId';

const router = useRouter();
const loaderStore = useLoaderStore();
const shelveStore = useShelvesStore();
const { getLoader } = storeToRefs(loaderStore);

const interval = ref(null);
const loaderProgress = ref(0);
const addShelveDialog = ref(false);

const loader = computed(() => getLoader.value);

const onShowLoader = () => {
  loaderStore.showLoader();
  interval.value = setInterval(() => {
    if (loaderProgress.value >= 100) {
      loaderStore.hideLoader();
    }

    const temp = loaderProgress.value + Math.floor(Math.random() * 100);

    if (temp > 100) {
      loaderProgress.value = 100;
    } else {
      loaderProgress.value = temp;
    }
  }, 500);
}

const onAddShelve = (shelve) => {
  shelveStore.addedShelves({
    ...shelve,
    images: [],
    id: `new_${uniqueId()}`,
  });
  addShelveDialog.value = false;
  router.push('/');
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
        <v-btn
          size="small"
          icon="mdi-cart-plus"
          variant="tonal"
          color="info"
          @click="() => addShelveDialog = true"
        />
      </v-app-bar>
      <v-main>
        <v-container>
          <div class="max-w-screen-md mx-auto mb-[56px]">
            <NuxtPage />
          </div>
        </v-container>
      </v-main>
    </v-layout>
    <v-bottom-navigation
      color="info"
      grow
      mandatory
    >
      <v-btn value="shelves" to="/">
        <v-icon>mdi-cart</v-icon>
        
        <span>Shelves</span>
      </v-btn>

      <v-btn value="admin" to="/admin">
        <v-icon>mdi-account-key</v-icon>

        <span>Admin</span>
      </v-btn>
    </v-bottom-navigation>
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
    <add-category-dialog
      :dialog="addShelveDialog"
      @add="onAddShelve"
      @close="addShelveDialog = false"
    />
  </v-app>
</template>

<style>
.v-overlay__scrim {
  opacity: 0.75 !important;
}
</style>