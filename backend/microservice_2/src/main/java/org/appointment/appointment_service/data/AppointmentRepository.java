package org.appointment.appointment_service.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

    @Query("select a from Appointment a where a.date=?1")
    public List<Appointment> findByDate(String date);

    @Query("select a from Appointment a where a.appointmentDate > :date")
    public List<Appointment> findByAppointmentDateAfter(@Param("date") LocalDate date);

}
