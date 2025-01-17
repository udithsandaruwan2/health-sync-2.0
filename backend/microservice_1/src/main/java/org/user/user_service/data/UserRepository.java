package org.user.user_service.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * UserRepository interface extends JpaRepository to provide CRUD operations
 * and custom query methods for the User entity.
 */
public interface UserRepository extends JpaRepository<User, Integer> {

    /**
     * Custom query to find users by their role.
     * @param role The role of the user (e.g., admin, user).
     * @return A list of users with the specified role.
     */
    @Query("SELECT u FROM User u WHERE u.role = ?1")
    public List<User> findByRole(int role);

    /**
     * Custom query to find users by their email.
     * @param email The email of the user to find.
     * @return A list of users with the specified email.
     */
    @Query("SELECT u FROM User u WHERE u.email = ?1")
    public List<User> findByEmail(String email);

}
