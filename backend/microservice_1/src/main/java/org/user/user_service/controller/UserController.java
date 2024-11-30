package org.user.user_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.user.user_service.data.User;
import org.user.user_service.service.UserService;

import java.util.List;

@RestController
public class UserController {

     @Autowired
     private UserService userService;

     @GetMapping(path = "/users")
     public List<User> getAllUsers() {
         return userService.getAllUsers();
     }

     @GetMapping(path = "/users/{id}")
     public User getUserById(@PathVariable int id) {
         return userService.getUserById(id);
     }

     @PostMapping(path = "/users")
     public User addUser(@RequestBody User user) {
         return userService.addUser(user);
     }

     @PutMapping(path = "/users")
     public User updateUser(@RequestBody User user) {
         return userService.updateUser(user);
     }

     @DeleteMapping(path = "/users/{id}")
     public void deleteUser(@PathVariable int id) {
         userService.deleteUser(id);
     }

//    @GetMapping(path = "/users")
//    public List<User> getUsersByRole(@RequestParam int role) {
//        return userService.getUsersByRole(role);
//    }



}
