import mongoose from "mongoose"

const AppointmentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name Appointment is required']
        },

        description: {
            type: String, 
            maxLength: [50, `Can't be overcome 50 characters`]
        },

        appointment: {
            type: Date,
            required: [true, 'Enter the date']
        },

        pet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Animal',
            required: [ true, 'Pet ID is required']
        },

        state: {
            type: String,
            enum:['Earring','Complete','Cancelled'],
            default: 'Earring' 
        },

        keeper:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Keeper ID is required']
        }
    }
)

export default mongoose.model('Appointment', AppointmentSchema)
