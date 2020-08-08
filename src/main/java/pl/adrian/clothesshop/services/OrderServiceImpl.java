package pl.adrian.clothesshop.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.adrian.clothesshop.models.Order;
import pl.adrian.clothesshop.models.Product;
import pl.adrian.clothesshop.repositories.OrderRepository;

@Service
public class OrderServiceImpl implements OrderService{

    private final OrderRepository orderRepository;
    private final ProductService productService;

    public OrderServiceImpl(OrderRepository orderRepository, ProductService productService) {
        this.orderRepository = orderRepository;
        this.productService = productService;
    }


    @Transactional
    @Override
    public Order saveOrder(Order order) {

        Order savedOrder = orderRepository.save(order);

        savedOrder.getProducts().forEach(item -> {
            Product temp = productService.getProduct(item.getId());
            temp.setOrder(savedOrder);
            productService.addProduct(temp);
        });

        return savedOrder;
    }
}
