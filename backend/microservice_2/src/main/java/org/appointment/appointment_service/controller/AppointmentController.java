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

    @PostMapping(path = "/appointments")
    public Appointment setAppointment(@RequestBody Appointment apt) {
        return aptService.setAppointment(apt);
    }

    @GetMapping(path = "appointments")
    public List<Appointment> getAppointment(){
        return aptService.getAppointment();
    }

    /*@GetMapping(path = "appointments/", params = "date")
    public List<Appointment> getAppointmentByDate(@RequestParam String date){
        return aptService.getAppointmentByDate(date);
    }*/
}
