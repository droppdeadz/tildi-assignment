<script setup>
import { getUnixTime } from 'date-fns';
import { storeToRefs } from 'pinia'
import { useShelvesStore } from '@/stores/shelves'
import { useToastStore } from '@/stores/toast'

const shelvesStore = useShelvesStore();
const toastStore = useToastStore();
const { getShelves } = storeToRefs(shelvesStore);

const shelves = computed(() => getShelves.value);

const dialog = ref(false);
const imageSelect = ref(null);

const getImages = (shelf) => shelf.images.map((image) => ({ id: shelf.id, ...image }))

const viewImage = (image) => {
  dialog.value = true;
  imageSelect.value = image;
}

const onApprove = (item) => {
  shelvesStore.approveImage(item.id, item);
  toastStore.showToast('Image approved successfully', 'success');
}

const onReject = (item) => {
  shelvesStore.rejectImage(item.id, item);
  toastStore.showToast('Image rejected successfully', 'success');
}
</script>

<template>
  <div>
    <div v-if="shelves.some((shelf) => shelf.images.length > 0)" class="flex flex-col gap-5">
      <template
        v-for="(shelf) in shelves"
        :key="`${shelf.name}`"
      >
        <v-card
          v-if="shelf.images.length > 0"
          elevation="0"
          class="border"
        >
          <v-card-title class="!text-base">
            {{ shelf.name }}
          </v-card-title>
          <admin-images-table
            :rows="getImages(shelf)"
            @approve="onApprove"
            @reject="onReject"
            @onSelect="viewImage"
          />
        </v-card>
      </template>
    </div>
    <div v-else>
      No images found
    </div>
    <v-dialog
      v-if="imageSelect"
      v-model="dialog"
      persistent
      max-width="500"
    >
      <div class="relative">
        <v-card class="max-h-[475px] overflow-hidden">
          <v-img
            :src="imageSelect.image"
            cover
            :alt="`dialog-${getUnixTime(imageSelect.uploadDate)}`"
          ></v-img>
        </v-card>
        <div class="absolute -bottom-16 left-1/2 -translate-x-1/2">
          <v-btn
            color="white"
            icon="mdi-close"
            @click="dialog = false"
          >
          </v-btn>
        </div>
      </div>
    </v-dialog>
  </div>
</template>