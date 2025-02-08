import {Router} from "express"
import {getAll, getUser, update, deleteUser} from "./user.controller.js"
import {validateJwt} from "../../middlewares/validate.jwt.js"
import { updateUserValidator } from "../../middlewares/validators.js"
import { changePassword } from "./user.controller.js";



const api = Router()

api.get('/', validateJwt, getAll)
api.get('/:id', validateJwt, getUser )
api.put('/:id', validateJwt, updateUserValidator, update)
api.delete('/:id', validateJwt, deleteUser)
api.put('/updatePass/:id', validateJwt, changePassword)


export default api
