import { defineStore } from 'pinia'
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
    shelve: {},
  }),
  getters: {
    getShelves: (state) =>  {
      return state.shelves;
    },
    getShelveById: (state) => {
      return (id) => state.shelves.find((shelve) => shelve.id === id)
    },
    getAllImages: (state) => {
      return state.shelves.map((shelve) => {
        return shelve.images.map((image) => {
          return {
            ...image,
            id: shelve.id,
          }
        })
      }).flat();
    }
  },
  actions: {
    addedShelves(shelve) {
      this.shelves.push(shelve);
    },
    selectedShelve(shelve) {
      this.shelve = shelve;
    },
    addedImages(images) {
      const payload = {
        uuid: uniqueId('image_'),
        image: images,
        uploadDate: new Date(),
        status: 'pending',
      }
      this.shelve.images.push(payload);
    },
    approveImage(shelveId, image) {
      const shelve = this.getShelveById(shelveId);
      shelve.images.forEach((img) => {
        if (img.uuid === image.uuid) {
          img.status = 'approved';
        }
      });
    },
    rejectImage(shelveId, image) {
      const shelve = this.getShelveById(shelveId);
      shelve.images.forEach((img) => {
        if (img.uuid === image.uuid) {
          img.status = 'rejected';
        }
      });
    }
  },
})