<script setup>
import { format, getUnixTime } from 'date-fns';

const props = defineProps({
  image: {
    type: Object,
    required: true
  }
});

const dialog = ref(false);
const color = computed(() => {
  if (props.image.status === 'rejected') {
    return 'error';
  } else if (props.image.status === 'pending') {
    return 'warning';
  } else {
    return 'success';
  }
});

const openDialog = () => {
  dialog.value = true;
}
</script>

<template>
  <div class="relative" @click="openDialog">
    <div class="after:absolute after:inset-0 after:bg-black/50 md:max-h-[250px] max-h-[200px] overflow-hidden">
      <v-img
        :src="image.image"
        height="250px"
        cover
        :alt="`${getUnixTime(image.uploadDate)}`"
      ></v-img>
    </div>
    <div class="absolute top-2 right-2 bg-white p-1 rounded">
      <p class="text-xs">{{ format(image.uploadDate, 'MM/dd/yyyy, HH:mm') }}</p>
    </div>
    <div class="absolute bottom-3 left-3">
      <v-chip
      :color="color"
      size="small"
      variant="elevated"
      elevation="0"
      class="capitalize"
    >
      {{ image.status }}
    </v-chip>
    </div>
  </div>
  <v-dialog
    v-model="dialog"
    persistent
  >
    <div class="relative">
      <v-card>
        <v-img
          :src="image.image"
          cover
          :alt="`dialog-${getUnixTime(image.uploadDate)}`"
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
</template>