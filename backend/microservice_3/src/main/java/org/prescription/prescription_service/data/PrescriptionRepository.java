package org.prescription.prescription_service.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Integer> {

    // Retrieve prescriptions by patient ID
    @Query("SELECT p FROM Prescription p WHERE p.pID = :patientId")
    List<Prescription> findByPatientId(@Param("patientId") int patientId);

    // Retrieve prescriptions by doctor ID
    @Query("SELECT p FROM Prescription p WHERE p.dID = :doctorId")
    List<Prescription> findByDoctorId(@Param("doctorId") int doctorId);

    // Retrieve prescriptions between two dates
    @Query("SELECT p FROM Prescription p WHERE p.dateTime BETWEEN :startDate AND :endDate")
    List<Prescription> findByDateTimeBetween(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    // Retrieve prescriptions by medicine name (case-insensitive search)
    @Query("SELECT p FROM Prescription p WHERE LOWER(p.medicine) LIKE LOWER(CONCAT('%', :medicine, '%'))")
    List<Prescription> findByMedicineContainingIgnoreCase(@Param("medicine") String medicine);

    // Count prescriptions by doctor ID
    @Query("SELECT COUNT(p) FROM Prescription p WHERE p.dID = :doctorId")
    int countByDoctorId(@Param("doctorId") int doctorId);

    // Find the most prescribed medicine
    @Query("SELECT p.medicine FROM Prescription p GROUP BY p.medicine ORDER BY COUNT(p.medicine) DESC")
    String findMostPrescribedMedicine();

    @Query("SELECT p FROM Prescription p WHERE DATE(p.dateTime) = :date")
    List<Prescription> findByDate(@Param("date") LocalDate date);

    // Retrieve prescriptions by a medicine
    @Query("SELECT p FROM Prescription p WHERE p.medicine = :medicine")
    List<Prescription> findByMedicine(@Param("medicine") String medicine);

}
