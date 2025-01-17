package org.user.user_service.data;

import jakarta.persistence.*;

/**
 * User class represents the user entity in the database.
 * This class is mapped to the "user" table and contains user details such as username, email, role, etc.
 */
@Entity
@Table(name = "user")
public class User {

    // Primary key for the user entity with auto-incrementing value
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "_id")
    private int id;

    // Username of the user
    @Column(name = "username")
    private String username;

    // Password of the user
    @Column(name = "password")
    private String password;

    // Email address of the user
    @Column(name = "email")
    private String email;

    // Role of the user (e.g., admin, user, etc.)
    @Column(name = "role")
    private int role;

    // Name of the user
    @Column(name = "name")
    private String name;

    // Specialization field (useful for specific user types like doctors)
    @Column(name = "specialization")
    private String specialization;

    // Description of the user (bio, profession, etc.)
    @Column(name = "description")
    private String description;

    // Rating of the user (e.g., user rating, doctor rating)
    @Column(name = "rating")
    private Float rating;

    // Number of reviews for the user
    @Column(name = "num_reviews")
    private Integer num_reviews;

    // Consultation fee (for service providers like doctors)
    @Column(name = "consultation_fee")
    private Double consultation_fee;

    // Path or URL to the user's profile image
    @Column(name = "image")
    private String image;

    // Getters and setters for each field

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getRating() {
        return rating;
    }

    public void setRating(Float rating) {
        this.rating = rating;
    }

    public Integer getNum_reviews() {
        return num_reviews;
    }

    public void setNum_reviews(Integer num_reviews) {
        this.num_reviews = num_reviews;
    }

    public Double getConsultation_fee() {
        return consultation_fee;
    }

    public void setConsultation_fee(Double consultation_fee) {
        this.consultation_fee = consultation_fee;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
