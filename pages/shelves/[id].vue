<script setup>
import { storeToRefs } from 'pinia'
import { useShelvesStore } from '@/stores/shelves'
import { useLoaderStore } from '@/stores/loader'

const { id } = useRoute().params;
const shelveStore = useShelvesStore();
const loaderStore = useLoaderStore();
const { getShelveById } = storeToRefs(shelveStore);
const { getLoader } = storeToRefs(loaderStore);
const shelve = getShelveById.value(id);
const loader = computed(() => getLoader.value);

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

const file = ref();
const fileInput = ref();
const previewImage = ref({
  src: 'https://placehold.co/300x300/EEE/31343C',
  isSelected: false,
});

const onSelectImage = (event) => {
  const file = event.target.files[0];
  previewImage.value.src = URL.createObjectURL(file);
  previewImage.value.isSelected = true;
}

const onClearImage = () => {
  previewImage.value.src = 'https://placehold.co/300x300/EEE/31343C';
  previewImage.value.isSelected = false;
  file.value = null;
}

const onUpload = () => {
  loaderStore.showLoader();
}

onMounted(() => {
  shelveStore.selectedShelve(shelve);
});

watch(loader, (value) => {
  if (!value) {
    shelveStore.addedImages(previewImage.value.src);
    previewImage.value.src = 'https://placehold.co/300x300/EEE/31343C';
    previewImage.value.isSelected = false;
    file.value = null;
  }
});
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
          <div class="relative">
            <v-img
              ref="image"
              :src="previewImage"
              cover
              class="md:h-[500px] h-[250px]"
              @click="fileInput.click()"
            ></v-img>
            <div v-if="previewImage.isSelected" class=" absolute top-2 right-2">
              <v-btn
                color="grey-darken-3"
                icon="mdi-close"
                @click="onClearImage"
              >
              </v-btn>
            </div>
          </div>
          <div class="p-3">
            <v-file-input
              ref="fileInput"
              v-model="file"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="Upload image"
              hide-details
              @change="onSelectImage"
            ></v-file-input>
          </div>
          <div class="p-3">
            <v-btn
              prepend-icon="mdi-upload"
              size="large"
              color="black"
              block
              @click="onUpload"
              :disabled="!file"
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
        :key="`${idx} - ${Math.random() * 10}`" v-for="(image, idx) in shelve.images"
        cols="6"
        sm="4"
      >
        <image-log :image="image" />
      </v-col>
    </v-row>
  </div>
</template>