import {defineStore} from 'pinia';

export const useLoginStore = defineStore('login', {
    state: () => ({
        token : null,
        refreshToken: null,
        user : {
            id : null,
            username : null,
            roles : []
        }
    }),
    getters: {
      getRoles() {
        return Array.from(this.user.roles);
      }
    },
    actions: {
        addToken(data) {
            // console.log(data)
            this.token = data.token
            this.refreshToken = data.refresh_token
        },
        addUser(data) {
            // console.log(data)
            this.user.id = data.id
            this.user.username = data.username
            this.user.roles = data.roles
        }
    },
    persist: true
});