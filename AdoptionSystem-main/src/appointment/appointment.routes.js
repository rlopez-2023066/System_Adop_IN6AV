import {validateJwt} from "../../middlewares/validate.jwt.js" 
import {Router} from "express"
import { saveAppointment } from "./appointment.controller.js"


const api = Router()

api.post('/add/appointment' ,validateJwt ,saveAppointment)

export default api