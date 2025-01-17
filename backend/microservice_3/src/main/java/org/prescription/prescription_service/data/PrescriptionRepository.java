package org.prescription.prescription_service.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Integer> {

    // Retrieve prescriptions by Appointment ID
    @Query("SELECT p FROM Prescription p WHERE p.appointmentId = :appointmentId")
    List<Prescription> findByAppointmentId(@Param("appointmentId") int appointmentId);

    // Retrieve prescriptions by Patient ID
    @Query("SELECT p FROM Prescription p WHERE p.patientId = :patientId")
    List<Prescription> findByPatientId(@Param("patientId") int patientId);

    // Retrieve prescriptions by Doctor ID
    @Query("SELECT p FROM Prescription p WHERE p.doctorId = :doctorId")
    List<Prescription> findByDoctorId(@Param("doctorId") int doctorId);

    // Retrieve prescriptions by medicine name (case-insensitive search)
    @Query("SELECT p FROM Prescription p WHERE LOWER(p.medicine) LIKE LOWER(CONCAT('%', :medicine, '%'))")
    List<Prescription> findByMedicineContainingIgnoreCase(@Param("medicine") String medicine);

    // Count prescriptions by Doctor ID
    @Query("SELECT COUNT(p) FROM Prescription p WHERE p.doctorId = :doctorId")
    int countByDoctorId(@Param("doctorId") int doctorId);

    // Find the most prescribed medicine
    @Query("SELECT p.medicine FROM Prescription p GROUP BY p.medicine ORDER BY COUNT(p.medicine) DESC")
    String findMostPrescribedMedicine();

    // Retrieve prescriptions by a specific medicine
    @Query("SELECT p FROM Prescription p WHERE p.medicine = :medicine")
    List<Prescription> findByMedicine(@Param("medicine") String medicine);
}
