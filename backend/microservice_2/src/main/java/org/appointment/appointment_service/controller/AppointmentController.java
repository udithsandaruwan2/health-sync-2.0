package org.appointment.appointment_service.controller;

import org.appointment.appointment_service.data.Appointment;
import org.appointment.appointment_service.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        return aptService.getAppointmentByDate(date);
    }

    //Retrieve details for a given appointment
    @GetMapping(path = "/appointments/{appointmentId}")
    public Appointment getAppointmentById(@PathVariable int appointmentId) {
        return aptService.getAppointmentById(appointmentId);
    }


    //Retrieve all upcoming appointments (filtered using data (localdate))
    /*@GetMapping(path = "/appointments/upcoming")
    public List<Appointment> getUpcomingAppointments() {
        return aptService.getUpcomingAppointments();
    }*/

    // Retrieve appointment scheduled for today
    /*@GetMapping(path = "/appointments/today")
    public List<Appointment> getTodaysAppointments() {
        return aptService.getTodaysAppointments();
    }*/



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
    public List<Appointment> getAppointmentsByStatus(@PathVariable String status) {
        return aptService.getAppointmentsByStatus(status);
    }



}
