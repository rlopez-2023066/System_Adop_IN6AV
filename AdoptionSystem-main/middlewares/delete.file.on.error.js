
import { unlink } from  'fs/promises' //Eliminar archivos
import {join} from 'path' //Unir carpetas o archivos o carpetas

//Middleware de eliminar
export const deleteFileOnError = async (error, req, res, next)=>{
    if(req.file && req.filePath){
                            
        const filePath = join(req.filePath, req.file.filename)

        try{
            await unlink(filePath)
        }catch(unlinkErr){
            console.error('Error deleting file', unlinkErr)
            
        }

    }
    
    if(error.status === 400 || error.errors){ //  === Estricto | == Abstracto
        return res.status(400).send(
            {
                success: false,
                message: 'Error registerig user',
                error
            }
        )

    }
    
    return res.status(500).send(
        {
            succes: false,
            message: error.message
        }
    )
}