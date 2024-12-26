package org.appointment.appointment_service.service;

import org.appointment.appointment_service.data.Appointment;
import org.appointment.appointment_service.data.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

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
        // Get today's date as a String
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd"); // Adjust format as needed
        String todayAsString = today.format(formatter);

        return aptRepo.findByAppointmentDateAfter(todayAsString);
    }


    public List<Appointment> getTodaysAppointments() {
        // Get today's date
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd"); // Adjust format as needed
        String todayAsString = today.format(formatter);
        return aptRepo.findAppointmentsByDate(todayAsString);
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

    public List<Appointment> getAppointmentsByStatus(String status) {
        return aptRepo.findByStatus(status);
    }

    // Method for Analytics
    public Map<String, Object> getAppointmentAnalytics() {
        Map<String, Object> analytics = new LinkedHashMap<>(); // LinkedHashMap to get the json output in order
        analytics.put("totalAppointments", aptRepo.count());
        analytics.put("accepteddAppointments", aptRepo.countByStatus("Accepted"));
        analytics.put("pendingAppointments", aptRepo.countByStatus("Pending"));
        return analytics;
    }

    public List<Appointment> findByPatientId(int id) {
        return aptRepo.findByPatientId(id);
    }

    public List<Appointment> findByDoctId(int id) {
        return aptRepo.findByDoctId(id);
    }

}

