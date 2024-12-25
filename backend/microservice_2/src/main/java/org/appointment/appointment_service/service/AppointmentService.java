package org.appointment.appointment_service.service;

import org.appointment.appointment_service.data.Appointment;
import org.appointment.appointment_service.data.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository aptRepo;


    public Appointment setAppointment(Appointment apt) {
        return aptRepo.save(apt);
    }

    public List<Appointment> getAppointment(){
        return aptRepo.findAll();// to get the list of student
    }

    /*public List<Appointment> getAppointmentByDate(String date){
        return aptRepo.findByDate(date);// to get the list of student
    }*/
}
