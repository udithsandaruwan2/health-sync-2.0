package org.appointment.appointment_service.service;

import org.appointment.appointment_service.data.Appointment;
import org.appointment.appointment_service.data.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    public Appointment getAppointmentById(int id){
        Optional<Appointment> appointment=  aptRepo.findById(id);
        if(appointment.isPresent()){
            return appointment.get();
        }
        return null;
    }

    public Appointment getAppointmentByPatient(int id){
        Optional<Appointment> appointment=  aptRepo.findById(id);
        if(appointment.isPresent()){
            return appointment.get();
        }
        return null;
    }

    public List<Appointment> getUpcomingAppointments() {
        // Get today's date
        LocalDate today = LocalDate.now();
        return aptRepo.findByAppointmentDateAfter(today);
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

    public Appointment updateStatus(int aptId, Appointment apt) {
        Appointment existingAppointment = aptRepo.findById(aptId)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id " + aptId));

        // Update the status of the existing appointment
        existingAppointment.setStatus(apt.getStatus());

        return aptRepo.save(existingAppointment);
    }


    public boolean cancelAppointment(int id){
        Optional<Appointment> appointment=  aptRepo.findById(id);
        if(appointment.isPresent()){
            aptRepo.deleteById(id);
            return true;
        }
        return false;
    }



}

