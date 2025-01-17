package org.user.user_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.user.user_service.data.User;
import org.user.user_service.service.UserService;

import java.util.List;

/**
 * UserController class handles HTTP requests related to user operations.
 * It interacts with the UserService to fetch, add, update, and delete user information.
 */
@RestController
public class UserController {

    // Injecting the UserService to handle the business logic for user operations
    @Autowired
    private UserService userService;

    /**
     * Endpoint to get all users.
     * @return List of all users.
     */
    @GetMapping(path = "/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers(); // Delegate to the UserService
    }

    /**
     * Endpoint to get a user by their ID.
     * @param id The ID of the user to fetch.
     * @return The User object corresponding to the given ID.
     */
    @GetMapping(path = "/users/{id}")
    public User getUserById(@PathVariable int id) {
        return userService.getUserById(id); // Delegate to the UserService
    }

    /**
     * Endpoint to add a new user.
     * @param user The user object to be added.
     * @return The added User object.
     */
    @PostMapping(path = "/users")
    public User addUser(@RequestBody User user) {
        return userService.addUser(user); // Delegate to the UserService
    }

    /**
     * Endpoint to update an existing user.
     * @param user The user object with updated information.
     * @return The updated User object.
     */
    @PutMapping(path = "/users")
    public User updateUser(@RequestBody User user) {
        return userService.updateUser(user); // Delegate to the UserService
    }

    /**
     * Endpoint to delete a user by their ID.
     * @param id The ID of the user to delete.
     */
    @DeleteMapping(path = "/users/{id}")
    public void deleteUser(@PathVariable int id) {
        userService.deleteUser(id); // Delegate to the UserService
    }

    /**
     * Endpoint to get users by their role.
     * @param role The role of the users to fetch.
     * @return List of users with the given role.
     */
    @GetMapping(path = "/users", params = {"role"})
    public List<User> getUsersByRole(@RequestParam int role) {
        return userService.getUsersByRole(role); // Delegate to the UserService
    }

    /**
     * Endpoint for user login.
     * @param user The login credentials (email and password).
     * @return ResponseEntity containing the logged-in user or an unauthorized status.
     */
    @PostMapping(path = "/auth/login")
    public ResponseEntity<User> loginUser(@RequestBody User user) {
        User loggedInUser = userService.loginUser(user.getEmail(), user.getPassword());

        // Return a successful response with the logged-in user if credentials are valid
        if (loggedInUser != null) {
            return ResponseEntity.ok(loggedInUser);
        } else {
            // Return an unauthorized response if credentials are invalid
            return ResponseEntity.status(401).body(null);
        }
    }
}
