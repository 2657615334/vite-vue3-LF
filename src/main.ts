import app from '@/airpower/app'
import './style.css'
import router from '@/config/router'
import { AppConfig } from '@/airpower/AppConfig'


AppConfig.appId = 'main'
AppConfig.router = router

app.use(router) //注册路由
app.mount('#app')
