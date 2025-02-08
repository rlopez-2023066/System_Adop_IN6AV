//Rutas de autenticación
import { Router } from "express"
import { 
    login,
    register, 
    test 
} from "./auth.controller.js"
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { registerValidator } from "../../middlewares/validators.js"
import { uploadProfilePicture } from "../../middlewares/multer.uploads.js"
import { deleteFileOnError } from "../../middlewares/delete.file.on.error.js"


const api = Router()

//Rutas públicas
                    //Middlewares
api.post(
    '/register', 
    [
        uploadProfilePicture.single("profilePicture"), 
        
        //Validador de errores!!!
        registerValidator,
        
        //Ejecutar la validadion de errores (delete.file.on.errors.js)
        deleteFileOnError
    ],
    register
)

api.post('/login', login)

//Rutas privadas
api.get('/test', validateJwt, test)

//Exporto las rutas
export default api