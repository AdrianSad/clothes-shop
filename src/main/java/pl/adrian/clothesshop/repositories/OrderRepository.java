package pl.adrian.clothesshop.repositories;

import org.springframework.data.repository.CrudRepository;
import pl.adrian.clothesshop.models.Order;

public interface OrderRepository extends CrudRepository<Order, Long> {
}
