'use strict'

import Animal from '../animal/animal.model.js'
import Appointment from '../appointment/appointment.model.js'

export const saveAppointment = async (req, res) => {
    try {
        let { name, appointment, pet, description, keeper } = req.body
        if (!name || !appointment || !pet || !keeper) {
            return res.status(400).send({ message: 'Name, Date, and Pet are required' })
        }
        const appointmentConvert = new Date(appointment).toISOString().split('T')[0]
        let existingAppointment = await Appointment.findOne({
            appointment: {
                $gte: new Date(appointmentConvert),
                $lt: new Date(new Date(appointmentConvert).setDate(new Date(appointmentConvert).getDate() + 1))
            }
        })
        if (existingAppointment) {
            return res.status(400).send({ message: 'An appointment already exists on this date' })
        }
        let animalAppointment = await Appointment.findOne({ pet })
        if (animalAppointment) {
            return res.status(400).send({ message: 'This animal already has an appointment' })
        }
        let animalExists = await Animal.findById(pet)
        if (!animalExists) {
            return res.status(404).send({ message: 'Animal not found' })
        }
        let newAppointment = new Appointment({ name, appointment, pet, description, keeper })
        await newAppointment.save()
        return res.status(201).send({ message: 'Appointment created successfully', newAppointment })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error creating appointment', error })
    }
}
