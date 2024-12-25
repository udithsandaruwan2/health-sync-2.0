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

    /*@Query("SELECT a FROM Appointment a WHERE a.appointmentDate > ?1")
    List<Appointment> findByAppointmentDateAfter(LocalDate date);*/


    /*@Query("select a from Appointment a where a.date = :date")
    public List<Appointment> findAppointmentsByDate(@Param("date") LocalDate date);*/
    @Query("SELECT a FROM Appointment a WHERE a.status = ?1")
    public List<Appointment> findByStatus(String status);


}
