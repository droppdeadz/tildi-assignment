<script setup>
import { format, getUnixTime } from 'date-fns';

const props = defineProps({
  rows: {
    type: Array,
    default: () => [],
  }
});

const emits = defineEmits(['approve', 'reject', 'onSelect'])

const getColor = (status) => {
  if (status === 'rejected') {
    return 'error';
  } else if (status === 'pending') {
    return 'warning';
  } else {
    return 'success';
  }
};
</script>

<template>
  <v-table
    density="compact"
    hover
  >
    <thead>
      <tr>
        <th scope="col" class="text-left text-sm">Image</th>
        <th scope="col" class="text-left text-sm px-1 whitespace-nowrap w-[1%]">Upload Date</th>
        <th scope="col" class="text-left text-sm px-1 whitespace-nowrap w-[1%]">Status</th>
        <th scope="col" class="w-[1%] px-1"></th>
      </tr>
    </thead>
    <tbody>
      <template v-if="rows.length > 0">
        <tr
          v-for="item in rows"
          :key="`${getUnixTime(item.uploadDate)}`"
        >
          <td>
            <div class="aspect-square rounded overflow-hidden max-h-20 my-2" @click="() => emits('onSelect', item)">
              <v-img
                :src="item.image"
                cover
                :alt="`${getUnixTime(item.uploadDate)}`"
              ></v-img>  
            </div>
          </td>
          <td class="whitespace-nowrap px-1">
            <p class="text-sm">{{ format(item.uploadDate, 'MM/dd/yyyy, HH:mm') }}</p>
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
                @click="() => emits('approve', { ...item })"
              />
              <v-btn
                size="x-small"
                icon="mdi-close"
                color="error"
                @click="() => emits('reject', { ...item })"
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
</template>