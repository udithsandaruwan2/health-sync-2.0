package org.user.user_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.user.user_service.data.User;
import org.user.user_service.data.UserRepository;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(int id) {
        return userRepository.findById(id).orElse(null);
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    public List<User> getUsersByRole(int role) {
        return userRepository.findByRole(role);
    }

    public User loginUser(String email, String password) {
        List<User> users = userRepository.findByEmail(email);

        if (!users.isEmpty()) {
            User user = users.get(0);  // Get the first result

            // Check password
            if (user.getPassword().equals(password)) {
                return user;  // Successful login
            }
        }

        return null;  // Invalid login or user not found
    }

}
