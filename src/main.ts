import { VueQueryPlugin } from '@tanstack/vue-query'

import MasonryWall from '@yeger/vue-masonry-wall'
import { createApp } from 'vue'
import App from './App.vue'

import { queryClient } from './plugins/vueQuery'
import router from './router'
import 'itx-ui-kit/style.css'
import './assets/base.css'

const app = createApp(App)
app.use(MasonryWall)
app.use(router)
app.use(VueQueryPlugin, { queryClient })
app.mount('#app')
