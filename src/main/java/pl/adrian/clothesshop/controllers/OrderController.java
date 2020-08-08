package pl.adrian.clothesshop.controllers;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.adrian.clothesshop.models.Order;
import pl.adrian.clothesshop.services.OrderService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    @PostMapping("/orders")
    public ResponseEntity<?> newOrder(@RequestBody Order order){

        orderService.saveOrder(order);

        return ResponseEntity.ok("Order created successfully!");
    }
}
