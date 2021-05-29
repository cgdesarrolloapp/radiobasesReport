import { createApp } from 'vue'
import App from './App.vue'

app.get('/reporte', (req, res) => createApp(App).mount('#app'))

