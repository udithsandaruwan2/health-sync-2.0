package org.appointment.appointment_service.controller;

import org.appointment.appointment_service.data.Appointment;
import org.appointment.appointment_service.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
public class AppointmentController {

    @Autowired
    private AppointmentService aptService;

    // Create Appointment
    @PostMapping(path = "/appointments")
    public Appointment setAppointment(@RequestBody Appointment apt) {
        return aptService.setAppointment(apt);
    }

    //Retrieve all appointments
    @GetMapping(path = "/appointments")
    public List<Appointment> getAppointment(){
        return aptService.getAppointment();
    }

    //Retrieve appointment details for a given date
    @GetMapping(path = "/appointments", params = "date")
    public List<Appointment> getAppointmentByDate(@RequestParam String date){

        // Define the expected date format (yyyy-MM-dd) as we now use local date
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        // Convert the String date to LocalDate (ignoring the time part)
        LocalDate localDate = LocalDate.parse(date, formatter);

        return aptService.getAppointmentByDate(localDate);
    }

    //Retrieve details for a given appointment
    @GetMapping(path = "/appointments/{appointmentId}")
    public Appointment getAppointmentById(@PathVariable int appointmentId) {
        return aptService.getAppointmentById(appointmentId);
    }


    //Retrieve all upcoming appointments (filtered using data (localdate))
    @GetMapping(path = "/appointments/upcoming")
    public List<Appointment> getUpcomingAppointments() {
        return aptService.getUpcomingAppointments();
    }

    // Retrieve appointment scheduled for today
    @GetMapping(path = "/appointments/today")
    public List<Appointment> getTodaysAppointments() {
        return aptService.getTodaysAppointments();
    }

    //Update appointment details(reason)
    @PutMapping(path = "/appointments/{appointmentId}")
    public Appointment updateAppointmentDetails(@PathVariable int appointmentId, @RequestBody Appointment updatedAppointment) {
        return aptService.updateAppointmentDetails(appointmentId, updatedAppointment);
    }

    //update status of the appointment
    @PutMapping(path = "appointments/{id}/status")
    public Appointment updateStatus(@PathVariable("id") int appointmentId, @RequestBody Appointment statusApt) {
        return aptService.updateStatus(appointmentId, statusApt);
    }

    //Cancel appointment
    @DeleteMapping(path = "/appointments/{appointmentId}")
    public boolean cancelAppointment(@PathVariable int appointmentId) {
        return aptService.cancelAppointment(appointmentId);
    }

    //Filter appointments by status
    @GetMapping(path = "/appointments/status/{status}")
    public List<Appointment> getAppointmentsByStatus(@PathVariable String status) { //Why path variable instead of query param ? Because we only have 3 status types
        return aptService.getAppointmentsByStatus(status);
    }

    @GetMapping(path = "/analytics")
    public Map<String, Object> getAppointmentAnalytics() {
        return aptService.getAppointmentAnalytics();
    }

    /*The one who developing patient microservice is responsible to implement a end point in their microservice and call this end point via a rest client
    * According Spring conventions*/

    //Retrieve all appointments related to a specific patient
    @GetMapping("/patients/{patientId}/appointments")
    public List<Appointment> getAppointmentsByUserId(@PathVariable int patientId) {
        return aptService.findByPatientId(patientId);
    }

    //Retrieve all appointments related to a specific doctor
    @GetMapping("/doctors/{docId}/appointments")
    public List<Appointment> getAppointmentsByDocId(@PathVariable int docId) {
        return aptService.findByDoctId(docId);
    }

}
