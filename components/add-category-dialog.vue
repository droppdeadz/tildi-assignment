<script setup>
const emits = defineEmits(['add', 'close']);

const props = defineProps({
  dialog: {
    type: Boolean,
  }
});

const show = computed(() => props.dialog);

const payload = reactive({
  name: '',
  image: null,
});

const fileInput = ref();
const previewImage = ref({
  src: 'https://placehold.co/300x300/EEE/31343C',
  isSelected: false,
});

const onSelectImage = (event) => {
  const file = event.target.files[0];
  previewImage.value.src = URL.createObjectURL(file);
  previewImage.value.isSelected = true;
  payload.image = URL.createObjectURL(file);
}

const onClearImage = () => {
  previewImage.value.src = 'https://placehold.co/300x300/EEE/31343C';
  previewImage.value.isSelected = false;
  payload.image = null;
}

const addShelve = () => {
  emits('add', payload);
  onClearImage();
};

const closeDialog = () => {
  emits('close');
  onClearImage();
};

</script>

<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="500"
  >
    <div class="relative">
      <v-card
        class="mx-auto"
        max-width="344"
      >
        <v-card-title>
          Add Shelve
        </v-card-title>
        
        <v-card-subtitle>
          Add Shelve categroy
        </v-card-subtitle>

        <v-card-text>
          <div class="relative">
            <div @click="fileInput.click()">
              <v-img
                v-if="previewImage.isSelected"
                :src="previewImage"
                cover
                class="h-[250px]"
              ></v-img>
              <div
                v-else
                class="h-[250px] w-full flex justify-center items-center"
              >
                <p class="text-2xl">Click to select file.</p>
              </div>
            </div>
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
              accept="image/png, image/jpeg, image/bmp"
              class="!hidden"
              @change="onSelectImage"
            ></v-file-input>
          </div>
          <v-text-field
            v-model="payload.name"
            label="Name"
            density="compact"
            color="info"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="info"
            variant="tonal"
            @click="addShelve"
            :disabled="payload.name && !payload.image"
          >
            Add
          </v-btn>
          <v-btn variant="plain" @click="closeDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-dialog>
</template>