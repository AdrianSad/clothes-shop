package pl.adrian.clothesshop.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.adrian.clothesshop.models.User;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
