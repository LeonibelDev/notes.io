import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Menu from './components/Menu.vue'
import Footer from './components/Footer.vue'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { fas } from '@fortawesome/free-solid-svg-icons';

/* Agrega todos los iconos sólidos a la biblioteca */
library.add(fas);

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('Menu', Menu)
app.component('Footer', Footer)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')