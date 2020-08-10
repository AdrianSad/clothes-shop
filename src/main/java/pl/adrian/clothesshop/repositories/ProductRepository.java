package pl.adrian.clothesshop.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.adrian.clothesshop.models.Product;

public interface ProductRepository extends CrudRepository<Product, Long> {

    Iterable<Product> findAllByUsername(String username);
}
