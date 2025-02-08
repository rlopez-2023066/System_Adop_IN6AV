'use strict'

//ECModules | ESModules
import express from 'express' //Servidor HTTP
import morgan from 'morgan' //Logs
import helmet from 'helmet' //Seguridad para HTTP
import cors from 'cors' //Acceso al API
import authRoutes from '../src/auth/auth.routes.js'
import userRouter from '../src/user/user.routes.js'
import authRouterAnimal from '../src/animal/animal.routes.js'
import appointRouter from '../src/appointment/appointment.routes.js'
import { limiter } from '../middlewares/rate.limit.js'

//Configuraciones de express
const configs = (app)=> {
    app.use(express.json()) //Aceptar y enviar datos en JSON
    app.use(express.urlencoded({extended: false})) //No encriptar la URL
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter) //valida las solicitudes en x tiempo
}

const routes = (app)=> {
    app.use(authRoutes)
    app.use(authRouterAnimal)
    app.use(appointRouter)
    app.use('/v1/user', userRouter)
}

//Ejecutamos el servidor
export const initServer = ()=> {
    const app = express() //Instancia de express
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    } catch (err) {
        console.error('Server init failed', err)
    }
}
