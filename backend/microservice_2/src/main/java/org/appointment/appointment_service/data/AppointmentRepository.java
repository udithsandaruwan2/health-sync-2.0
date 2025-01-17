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

    /*@Query("select a from Appointment a where a.date=?1")
    public List<Appointment> findByDate(String date);*/

    //Validate appointment to prevent duplicate bookings
    @Query("SELECT COUNT(a) > 0 FROM Appointment a WHERE a.docId = :docId " +
            "AND a.date BETWEEN :startTime AND :endTime")
    public boolean validateAppointment(@Param("docId") int docId,
                                       @Param("startTime") LocalDateTime startTime,
                                       @Param("endTime") LocalDateTime endTime);



    @Query("SELECT a FROM Appointment a WHERE CAST(a.date AS date) = :date")
    List<Appointment> findByDate(@Param("date") LocalDate date);



    @Query("SELECT a FROM Appointment a WHERE CAST(a.date as date) > ?1")
    List<Appointment> findByAppointmentDateAfter(LocalDate date);

    @Query("select a from Appointment a where CAST(a.date AS date) = ?1")
    public List<Appointment> findAppointmentsByDate(LocalDate date);

    @Query("SELECT a FROM Appointment a WHERE a.status = ?1")
    public List<Appointment> findByStatus(String status);

    @Query("SELECT COUNT(a) FROM Appointment a WHERE a.status = ?1")
    public int countByStatus(String status);

    @Query("Select a from Appointment a Where a.patientId = ?1")
    public List<Appointment> findByPatientId(int id);

    @Query("Select a from Appointment a Where a.docId = ?1")
    public List<Appointment> findByDoctId(int id);

    @Query("SELECT a FROM Appointment a WHERE a.status = ?1 AND a.docId = ?2")
    public List<Appointment> findByStatusAndDoctorId(String status, int doctorId);

    @Query("SELECT a FROM Appointment a WHERE a.status = ?1 AND a.patientId = ?2")
    public List<Appointment> findByStatusAndPatientId(String status, int patientId);



}
