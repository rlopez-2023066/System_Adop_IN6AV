import { Router } from "express"
import { saveAnimal, getAnimal, updateAnimal, deleteAnimal, getAnimalById } from  '../animal/animal.controller.js'
import { validateJwt } from "../../middlewares/validate.jwt.js"

const api = Router()

api.post('/animal',validateJwt ,saveAnimal)
api.get('/animal',validateJwt ,getAnimal)
api.get('/animal/:id',validateJwt, getAnimalById)
api.put('/animal/:id',validateJwt, updateAnimal)
api.delete('/animal/:id',validateJwt, deleteAnimal)

export default api
