package org.user.user_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.user.user_service.data.User;
import org.user.user_service.data.UserRepository;

import java.util.List;

/**
 * UserService class provides the business logic for user-related operations.
 * It interacts with the UserRepository to perform CRUD operations and other user management tasks.
 */
@Service
public class UserService {

    // Injecting the UserRepository to perform database operations
    @Autowired
    private UserRepository userRepository;

    /**
     * Fetch all users from the database.
     * @return A list of all users.
     */
    public List<User> getAllUsers() {
        return userRepository.findAll(); // Fetch all users using JpaRepository's findAll method
    }

    /**
     * Fetch a user by their ID.
     * @param id The ID of the user to retrieve.
     * @return The user object if found, else null.
     */
    public User getUserById(int id) {
        return userRepository.findById(id).orElse(null); // Fetch user by ID, return null if not found
    }

    /**
     * Add a new user to the database.
     * @param user The user object to add.
     * @return The added user object.
     */
    public User addUser(User user) {
        return userRepository.save(user); // Save the user object to the database
    }

    /**
     * Update an existing user in the database.
     * @param user The user object with updated information.
     * @return The updated user object.
     */
    public User updateUser(User user) {
        return userRepository.save(user); // Save the updated user object to the database
    }

    /**
     * Delete a user by their ID.
     * @param id The ID of the user to delete.
     */
    public void deleteUser(int id) {
        userRepository.deleteById(id); // Delete the user by their ID
    }

    /**
     * Fetch users by their role.
     * @param role The role of the users to retrieve.
     * @return A list of users with the specified role.
     */
    public List<User> getUsersByRole(int role) {
        return userRepository.findByRole(role); // Fetch users based on their role
    }

    /**
     * Log in a user by verifying their email and password.
     * @param email The email of the user attempting to log in.
     * @param password The password of the user attempting to log in.
     * @return The logged-in user object if credentials are correct, else null.
     */
    public User loginUser(String email, String password) {
        // Fetch users with the given email
        List<User> users = userRepository.findByEmail(email);

        // If the user list is not empty, check the password
        if (!users.isEmpty()) {
            User user = users.get(0); // Get the first user from the list

            // Check if the password matches
            if (user.getPassword().equals(password)) {
                return user; // Return the user if login is successful
            }
        }

        return null; // Return null if login fails
    }

}
