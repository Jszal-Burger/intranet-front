import { useOtherStore } from '@/store/other';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();

    axios.interceptors.request.use(
      (config) => {
        const token = config.headers.Authorization ? config.headers.Authorization.split(' ')[1] : null;
        
        if (token) {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          
          if (decodedToken.exp < currentTime) {
            router.push('/login');
          }
        }
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    }, function (error) {
      console.log(error)
      const otherStore = useOtherStore();
      otherStore.snackBar.showSnackBar = true;
      otherStore.snackBar.text = error.code + " : " + error.message;
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    });

    // Exportez Axios configuré avec l'intercepteur
    return {axios};
  },
};