package org.appointment.appointment_service.service;

import org.appointment.appointment_service.data.Appointment;
import org.appointment.appointment_service.data.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository aptRepo;

    public Appointment setAppointment(Appointment apt) {

        // Get the date and time of the appointment
        Date aptDate = apt.getDate();
        String aptTimeSelected = apt.getTime_selected();

        // Combine date and time to get the full appointment time
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Date startTime = null;
        try {
            // Combine the date and the time
            startTime = sdf.parse(new SimpleDateFormat("yyyy-MM-dd").format(aptDate) + " " + aptTimeSelected);
        } catch (ParseException e) {
            throw new RuntimeException("Error while parsing date and time.", e);
        }

        // Convert startTime (java.util.Date) to LocalDateTime
        LocalDateTime startDateTime = startTime.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();

        // Create an end time by adding 30 minutes to the start time
        LocalDateTime endDateTime = startDateTime.plusMinutes(30);

        // Check if there are any appointments for the doctor within the 30-minute window
        if (aptRepo.validateAppointment(apt.getDocId(), startDateTime, endDateTime)) {
            // Handle conflicting appointment (e.g., throw an exception or return an error)
            throw new RuntimeException("Doctor is already booked within 30 minutes of the requested time.");
        } else {
            // Proceed with saving the new appointment if no conflict
            return aptRepo.save(apt);
        }
    }


    public List<Appointment> getAppointment(){
        return aptRepo.findAll();// to get the list of Appointments
    }

    public List<Appointment> getAppointmentByDate(LocalDate date){
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

        return aptRepo.findByAppointmentDateAfter(today);
    }


    public List<Appointment> getTodaysAppointments() {
        // Get today's date
        LocalDate today = LocalDate.now();

        return aptRepo.findAppointmentsByDate(today);
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

