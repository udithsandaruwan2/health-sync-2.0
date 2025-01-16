package org.appointment.appointment_service.data;

import jakarta.persistence.*;

import java.sql.Time;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "Appointment")
public class Appointment {

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "Apt_Patient_Id")
    private int patientId;

    @Column(name = "Apt_Doctor_Id")
    private int docId;

    @Column(name = "Apt_Date")
    private Date date;

    @Column(name = "Apt_Reason")
    private String reason;

    @Column(name = "Apt_Status")
    private String status;

    @Column(name = "Apt_Time_Selected")
    private String time_selected;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPatientId() {
        return patientId;
    }

    public void setPatientId(int patientId) {
        this.patientId = patientId;
    }

    public int getDocId() {
        return docId;
    }

    public void setDocId(int docId) {
        this.docId = docId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTime_selected() {
        return time_selected;
    }

    public void setTime_selected(String time_selected) {
        this.time_selected = time_selected;
    }
}
