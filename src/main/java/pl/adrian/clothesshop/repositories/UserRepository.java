package pl.adrian.clothesshop.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.adrian.clothesshop.models.User;

public interface UserRepository extends CrudRepository<User, Long> {
}
