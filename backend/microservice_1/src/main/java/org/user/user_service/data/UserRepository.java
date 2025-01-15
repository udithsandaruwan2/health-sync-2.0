package org.user.user_service.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("SELECT u FROM User u WHERE u.role = ?1")
    public List<User> findByRole(int role);

    @Query("SELECT u FROM User u WHERE u.email = ?1")
    public List<User> findByEmail(String email);


}
