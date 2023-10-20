import {defineStore} from 'pinia';

export const useOtherStore = defineStore('other', {
    state: () => ({
        snackBar : {
            showSnackBar : false,
            text : null,
        }
    }),
    getters: {
      
    },
    actions: {

    },
    persist: true
});