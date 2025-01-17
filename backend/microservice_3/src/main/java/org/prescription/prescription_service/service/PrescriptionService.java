package org.prescription.prescription_service.service;

import org.prescription.prescription_service.data.Prescription;
import org.prescription.prescription_service.data.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PrescriptionService {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    public Prescription createPrescription(Prescription prescription) {
        return prescriptionRepository.save(prescription);
    }

    // Retrieve all Prescriptions
    public List<Prescription> getAllPrescriptions() {
        return prescriptionRepository.findAll();
    }

    // Retrieve Prescription by ID
    public Prescription getPrescriptionById(int id) {
        Optional<Prescription> prescription = prescriptionRepository.findById(id);
        if (prescription.isPresent()) {
            return prescription.get();
        }
        return null;
    }

    // Retrieve Prescriptions by Patient ID
    public List<Prescription> getPrescriptionsByPatientId(int patientId) {
        return prescriptionRepository.findByPatientId(patientId);
    }

    // Retrieve Prescriptions by Doctor ID
    public List<Prescription> getPrescriptionsByDoctorId(int doctorId) {
        return prescriptionRepository.findByDoctorId(doctorId);
    }

    // Update Prescription Details
    public Prescription updatePrescription(int id, Prescription updatedPrescription) {
        Prescription existingPrescription = prescriptionRepository.findById(id).orElse(null);
        if (existingPrescription != null) {
            existingPrescription.setDescription(updatedPrescription.getDescription());
            existingPrescription.setMedicine(updatedPrescription.getMedicine());
            return prescriptionRepository.save(existingPrescription);
        }
        return null;
    }

    // Delete a Prescription
    public boolean deletePrescription(int id) {
        if (prescriptionRepository.existsById(id)) {
            prescriptionRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Filter Prescriptions by Medicine
    public List<Prescription> getPrescriptionsByMedicine(String medicine) {
        return prescriptionRepository.findByMedicine(medicine);
    }

    // Generate Prescription Analytics
    public Map<String, Object> getPrescriptionAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalPrescriptions", prescriptionRepository.count());
        analytics.put("mostPrescribedMedicine", prescriptionRepository.findMostPrescribedMedicine());
        return analytics;
    }

    // Retrieve Prescriptions by Appointment ID
    public List<Prescription> getPrescriptionsByAppointmentId(int appointmentId) {
        return prescriptionRepository.findByAppointmentId(appointmentId);
    }
}
