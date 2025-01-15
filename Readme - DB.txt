CREATE DATABASE healthsync_appointment_db;

use healthsync_appointment_db;

CREATE TABLE Appointment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Apt_Patient_Id INT NOT NULL,
    Apt_Doctor_Id INT NOT NULL,
    Apt_Date DATETIME NOT NULL,   -- Use DATETIME to store both date and time
    Apt_Reason VARCHAR(255),
    Apt_Status VARCHAR(50)
);

