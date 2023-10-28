import { defineStore } from 'pinia'

export const useLoaderStore = defineStore('loader', {
  state: () => ({
    loader: false,
  }),
  getters: {
    getLoader: (state) => {
      return state.loader;
    }
  },
  actions: {
    showLoader() {
      this.loader = true;
    },
    hideLoader() {
      this.loader = false;
    }
  },
})