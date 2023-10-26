import { defineStore } from 'pinia'

export const useShelvesStore = defineStore('shelves', {
  state: () => ({
    shelves: [
      {
        id: 1,
        name: 'Beverage',
        image: '/images/beverages.jpg',
        products: 0,
      },
      {
        id: 2,
        name: 'Snacks',
        image: '/images/snacks.webp',
        products: 0,
      },
      {
        id: 3,
        name: 'Cosmetics',
        image: '/images/cosmetics.jpg',
        products: 0,
      },
      {
        id: 4,
        name: 'Foods',
        image: '/images/foods.jpg',
        products: 0,
      }
    ],
    shelve: {},
  }),
  getters: {
    getShelveById: (state) => {
      return (id) => state.shelves.find((shelve) => shelve.id === Number(id))
    },
  },
})