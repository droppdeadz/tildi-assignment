import { defineStore } from 'pinia'
import { useToastStore } from '@/stores/toast'
import uniqueId from 'lodash/uniqueId';

export const useShelvesStore = defineStore('shelves', {
  state: () => ({
    shelves: [
      {
        id: '1',
        name: 'Beverage',
        image: '/images/beverages.jpg',
        images: [],
      },
      {
        id: '2',
        name: 'Snacks',
        image: '/images/snacks.webp',
        images: [],
      },
      {
        id: '3',
        name: 'Cosmetics',
        image: '/images/cosmetics.jpg',
        images: [],
      },
      {
        id: '4',
        name: 'Foods',
        image: '/images/foods.jpg',
        images: [],
      }
    ],
    shelf: {},
  }),
  getters: {
    getShelves: (state) =>  {
      return state.shelves;
    },
    getShelfById: (state) => {
      return (id) => state.shelves.find((shelf) => shelf.id === id)
    },
    getAllImages: (state) => {
      return state.shelves.map((shelf) => {
        return shelf.images.map((image) => {
          return {
            ...image,
            id: shelf.id,
          }
        })
      }).flat();
    }
  },
  actions: {
    addedShelf(shelf) {
      const toastStore = useToastStore();
      if (this.shelves.some((s) => String(s.name).toLowerCase() == String(shelf.name).toLowerCase())) {
        return toastStore.showToast('Cannot added shelf', 'error');
      };
      this.shelves.push(shelf);
      toastStore.showToast('Shelf added successfully', 'success');
    },
    selectedShelf(shelf) {
      this.shelf = shelf;
    },
    addedImages(images) {
      const payload = {
        uuid: uniqueId('image_'),
        image: images,
        uploadDate: new Date(),
        status: 'pending',
      }
      this.shelf.images.push(payload);
    },
    approveImage(shelfId, image) {
      const shelf = this.getShelfById(shelfId);
      shelf.images.forEach((img) => {
        if (img.uuid === image.uuid) {
          img.status = 'approved';
        }
      });
    },
    rejectImage(shelfId, image) {
      const shelf = this.getShelfById(shelfId);
      shelf.images.forEach((img) => {
        if (img.uuid === image.uuid) {
          img.status = 'rejected';
        }
      });
    }
  },
})