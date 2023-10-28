<script setup>
import { format, getUnixTime } from 'date-fns';
import { storeToRefs } from 'pinia'
import { useShelvesStore } from '@/stores/shelves'

const shelveStore = useShelvesStore();
const { getAllImages } = storeToRefs(shelveStore);

const images = computed(() => getAllImages.value);
const dialog = ref(false);
const imageSelect = ref(null);

const getColor = (status) => {
  if (status === 'rejected') {
    return 'error';
  } else if (status === 'pending') {
    return 'warning';
  } else {
    return 'success';
  }
};

const openDialog = (image) => {
  dialog.value = true;
  imageSelect.value = image;
}
</script>

<template>
  <div>
    <v-table
      density="compact"
      hover
    >
      <thead>
        <tr>
          <th class="text-left text-sm">
            Image
          </th>
          <th class="text-left text-sm px-1 whitespace-nowrap w-[1%]">
            Upload Date
          </th>
          <th class="text-left text-sm px-1 whitespace-nowrap w-[1%]">
            Status
          </th>
          <th class="w-[1%] px-1"></th>
        </tr>
      </thead>
      <tbody>
        <template v-if="images.length > 0">
          <tr
            v-for="item in images"
            :key="`${getUnixTime(item.uploadDate)}`"
          >
            <td>
              <div class="aspect-square overflow-hidden max-h-20 my-2" @click="() => openDialog(item)">
                <v-img
                  :src="item.image"
                  cover
                  :alt="`${getUnixTime(item.uploadDate)}`"
                ></v-img>  
              </div>
            </td>
            <td class="whitespace-nowrap px-1">
              <v-chip
                size="small"
                variant="elevated"
                elevation="0"
              >
              {{ format(item.uploadDate, 'MM/dd/yyyy, HH:mm') }}
              </v-chip>
            </td>
            <td class="text-center px-1">
              <v-chip
                :color="getColor(item.status)"
                size="small"
                variant="elevated"
                elevation="0"
                class="capitalize"
              >
                {{ item.status }}
              </v-chip>  
            </td>
            <td class="pl-1">
              <div v-if="item.status === 'pending'" class="flex gap-1">
                <v-btn
                  size="x-small"
                  icon="mdi-check"
                  color="success"
                  @click="() => shelveStore.approveImage(item.id, item)"
                />
                <v-btn
                  size="x-small"
                  icon="mdi-close"
                  color="error"
                  @click="() => shelveStore.rejectImage(item.id, item)"
                />
              </div>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td
            colspan="4"
            class="text-center"
          >
            No images found
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-dialog
      v-if="imageSelect"
      v-model="dialog"
      persistent
    >
      <div class="relative">
        <v-card>
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