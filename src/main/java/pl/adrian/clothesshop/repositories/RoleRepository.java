package pl.adrian.clothesshop.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.adrian.clothesshop.models.ERole;
import pl.adrian.clothesshop.models.User;
import pl.adrian.clothesshop.models.UserRole;

import javax.management.relation.Role;
import java.util.Optional;

public interface RoleRepository extends CrudRepository<UserRole, Long> {

    Optional<UserRole> findByName(ERole name);
}
