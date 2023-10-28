import { defineStore } from 'pinia'

export const useShelvesStore = defineStore('shelves', {
  state: () => ({
    shelves: [
      {
        id: 1,
        name: 'Beverage',
        image: '/images/beverages.jpg',
        products: 0,
        images: [],
      },
      {
        id: 2,
        name: 'Snacks',
        image: '/images/snacks.webp',
        products: 0,
        images: [],
      },
      {
        id: 3,
        name: 'Cosmetics',
        image: '/images/cosmetics.jpg',
        products: 0,
        images: [],
      },
      {
        id: 4,
        name: 'Foods',
        image: '/images/foods.jpg',
        products: 0,
        images: [],
      }
    ],
    shelve: {},
  }),
  getters: {
    getShelveById: (state) => {
      return (id) => state.shelves.find((shelve) => shelve.id === Number(id))
    },
  },
  actions: {
    selectedShelve(shelve) {
      this.shelve = shelve;
    },
    addedImages(images) {
      const payload = {
        image: images,
        uploadDate: new Date(),
        status: 'success',
      }
      this.shelve.images.push(payload);
    }
  },
})