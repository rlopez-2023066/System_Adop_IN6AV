
import User from './user.model.js'
import { encrypt, checkPassword } from "../../utils/encryp.js"; 

export const getAll = async(req,res)=>{
    try{
      
        const { limit = 20, skip = 0} = req.query

        const users  =  await User.find()
            .skip(skip)
            .limit(limit)

        if(users.length === 0){
            return res.status(404).send(
                {
                    succes:false,
                    message: 'Users not found'
                }
            )
        }
        
        return res.send(
            {
                succes: true,
                message: 'Users found',
                users
            }
        )

    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error',e})
    }
}

export const getUser = async(req, res)=>{
    try {
        let {id} = req.params
        let user = await User.findById(id)

        if(!user) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )

        return res.send(
            {
                success: true,
                message: 'User found: ', 
                user
            }
        )


    } catch (err) {
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }
}

export const update = async(req, res) =>{
    try{
        const {id}= req.params 

        const data = req.body

        

        const update = await User.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )

        if(!update) return res.status(404).send(
            {
                success:false,
                message:'User not found'
                
            }
        )

        return res.send(
            {
                success: true,
                message: 'User updated',
                user: update
            }
        )

    }catch(error){
        console.error('General Error', error);
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                error
            }
        )
    }
}

export const deleteUser = async(req,res)=>{
    try{
        let { id } = req.params

        let user = await User.findByIdAndDelete(id)
        if(!user) return res.status(404).send(
            {
                succes: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                succes: true, 
                message: 'User removed ',
            }
        )
    }catch(err){
        console.error('General error', err)
        return res.status(500).send(
            {
                succes: false,
                message: 'General error', err
            }
        )
    }
}





export const changePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { oldPassword, newPassword } = req.body;

        const user = await User.findById(id)
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        const isMatch = await checkPassword(user.password, oldPassword)
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Current password is incorrect"
            });
        }

        user.password = await encrypt(newPassword)
        await user.save();

        return res.send({
            success: true,
            message: "Password updated successfully"
        });

    } catch (error) {
        console.error("Error updating password:", error);
        return res.status(500).send({
            success: false,
            message: "General error",
            error
        })
    }
}

