package org.prescription.prescription_service.controller;


import org.prescription.prescription_service.data.Prescription;
import org.prescription.prescription_service.service.PrescriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class PrescriptionController {

    @Autowired
    private PrescriptionService prescriptionService;

    // Create a Prescription
    @PostMapping(path = "/prescriptions")
    public Prescription createPrescription(@RequestBody Prescription prescription) {
        prescription.setDateTime(java.time.LocalDateTime.now()); // Set the current timestamp
        return prescriptionService.createPrescription(prescription);
    }

    // Retrieve all Prescriptions
    @GetMapping(path = "/prescriptions")
    public List<Prescription> getAllPrescriptions() {
        return prescriptionService.getAllPrescriptions();
    }

    @GetMapping("/prescriptions/{prescriptionId}")
    public Prescription getPrescriptionById(@PathVariable int prescriptionId) {
        return prescriptionService.getPrescriptionById(prescriptionId);
    }

    // Retrieve Prescriptions by Patient ID
    @GetMapping("/patients/{patientId}/prescriptions")
    public List<Prescription> getPrescriptionsByPatientId(@PathVariable int patientId) {
        return prescriptionService.getPrescriptionsByPatientId(patientId);
    }

    // Retrieve Prescriptions by Doctor ID
    @GetMapping("/doctors/{doctorId}/prescriptions")
    public List<Prescription> getPrescriptionsByDoctorId(@PathVariable int doctorId) {
        return prescriptionService.getPrescriptionsByDoctorId(doctorId);
    }

    // Retrieve Prescription by Appointment Date
    @GetMapping("/prescriptions/date")
    public List<Prescription> getPrescriptionsByDate(@RequestParam String date) {
        java.time.format.DateTimeFormatter formatter = java.time.format.DateTimeFormatter.ofPattern("yyyy-MM-dd");
        java.time.LocalDate localDate = java.time.LocalDate.parse(date, formatter);
        return prescriptionService.getPrescriptionsByDate(localDate);
    }

    // Update Prescription Details
    @PutMapping("/prescriptions/{prescriptionId}")
    public Prescription updatePrescription(@PathVariable int prescriptionId, @RequestBody Prescription updatedPrescription) {
        return prescriptionService.updatePrescription(prescriptionId, updatedPrescription);
    }

    // Delete a Prescription
    @DeleteMapping("/prescriptions/{prescriptionId}")
    public boolean deletePrescription(@PathVariable int prescriptionId) {
        return prescriptionService.deletePrescription(prescriptionId);
    }

    // Filter Prescriptions by Medicine
    @GetMapping("/medicines/prescriptions")
    public List<Prescription> getPrescriptionsByMedicine(@RequestParam String medicine) {
        return prescriptionService.getPrescriptionsByMedicine(medicine);
    }

    // Generate Prescription Analytics
    @GetMapping("/prescriptions/analytics")
    public Map<String, Object> getPrescriptionAnalytics() {
        return prescriptionService.getPrescriptionAnalytics();
    }
}
