package org.appointment.appointment_service.service;

import org.appointment.appointment_service.data.Appointment;
import org.appointment.appointment_service.data.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository aptRepo;


    public Appointment setAppointment(Appointment apt) {
        return aptRepo.save(apt);
    }

    public List<Appointment> getAppointment(){
        return aptRepo.findAll();// to get the list of Appointments
    }

    public List<Appointment> getAppointmentByDate(String date){
        return aptRepo.findByDate(date);
    }

    public Appointment getAppointmentByPatient(int id){
        Optional<Appointment> appointment=  aptRepo.findById(id);
        if(appointment.isPresent()){
            return appointment.get();
        }
        return null;
    }

    public Appointment updateAppointmentDetails(int aptId, Appointment apt){
        Appointment existingAppointment = aptRepo.findById(aptId)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id " + aptId));

        // Update the fields of the existing appointment
        existingAppointment.setDate(apt.getDate());
        existingAppointment.setReason(apt.getReason());

        // Save the updated appointment to the database
        return aptRepo.save(existingAppointment);
    }
}

