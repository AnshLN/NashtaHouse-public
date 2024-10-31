import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useLoadingStore = defineStore('loading', () => {
    const isLoading = ref(true)
    function LoadingTrue() {
      isLoading.value=true;
    }
    function LoadingFalse() {
        isLoading.value=false;
    }
  
    return { isLoading, LoadingTrue, LoadingFalse }
  })