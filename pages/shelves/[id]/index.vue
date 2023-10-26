<script setup>
import { storeToRefs } from 'pinia'
import { useShelvesStore } from '@/stores/shelves'
import { format } from 'date-fns'

const { id } = useRoute().params;
const store = useShelvesStore();
const { getShelveById } = storeToRefs(store);
const shelve = getShelveById.value(id);

const breadcrumbs = [
  {
    title: 'Home',
    disabled: false,
    to: '/',
  },
  {
    title: shelve.name,
    disabled: true,
  },
]

const image = ref();
</script>

<template>
  <v-breadcrumbs
    class="pt-0 px-0"
    :items="breadcrumbs"
  />
  <v-card
    class="mx-auto"
    max-width="768"
  >
    <v-row dense>
      <v-col cols="12">
        <v-card>
          <v-img
            ref="image"
            src="https://placehold.co/300x300/EEE/31343C"
            height="250px"
            cover
          ></v-img>
          <div class="p-3">
            <v-file-input
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="Upload image"
              hide-details=""
            ></v-file-input>
          </div>
          <div class="p-3">
            <v-btn
              prepend-icon="mdi-upload"
              size="large"
              color="black"
              block
            >
            <template v-slot:prepend>
              <v-icon color="success"></v-icon>
            </template>
            Upload
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
  <div class="py-5">
    <p class="font-extrabold text-xl mb-3">History</p>
    <v-row dense="">
      <v-col
        :key="col" v-for="col in 8"
        cols="6"
        sm="4"
        class="md:max-h-[250px] max-h-[200px] relative"
      >
        <v-img
          ref="image"
          src="https://placehold.co/300x300/EEE/31343C"
          height="250px"
          cover
          :alt="`image-${col}`"
        ></v-img>
        <div class="absolute top-3 right-3">
          <p class="text-xs">{{ format(new Date(), 'MM/dd/yyyy, HH:mm') }}</p>
        </div>
        <div class="absolute bottom-3 left-3">
          <v-chip color="success" size="small">Success</v-chip>
        </div>
      </v-col>
    </v-row>
  </div>
</template>