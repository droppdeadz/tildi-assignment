import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({
    toast: {
      open: false,
      message: '',
      type: '',
    },
  }),
  getters: {
    getToast: (state) => {
      return state.toast;
    }
  },
  actions: {
    showToast(message, type) {
      this.toast.open = true;
      this.toast.message = message;
      this.toast.type = type;
    },
    hideToast() {
      this.toast.open = false;
      this.toast.message = '';
      this.toast.type = '';
    }
  },
})