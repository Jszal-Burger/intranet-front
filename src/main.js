/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import {createPinia} from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import axios from './plugins/axios-interceptor'; // Importez l'intercepteur Axios configuré

const pinia = createPinia();
const app = createApp(App);
pinia.use(piniaPluginPersistedstate);
app.use(pinia);

registerPlugins(app);

app.mount('#app');
