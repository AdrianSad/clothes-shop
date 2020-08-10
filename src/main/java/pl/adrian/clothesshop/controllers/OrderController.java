package pl.adrian.clothesshop.controllers;

import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import pl.adrian.clothesshop.models.Order;
import pl.adrian.clothesshop.models.payload.request.ChargeRequest;
import pl.adrian.clothesshop.services.OrderService;
import pl.adrian.clothesshop.services.StripeServiceImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class OrderController {

    private final OrderService orderService;

    private final StripeServiceImpl stripeService;

    public OrderController(OrderService orderService, StripeServiceImpl stripeService) {
        this.orderService = orderService;
        this.stripeService = stripeService;
    }

    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    @PostMapping("/orders")
    public ResponseEntity<?> newOrder(@RequestBody Order order){

        orderService.saveOrder(order);

        return ResponseEntity.ok("Order created successfully!");
    }

//    @PostMapping("/charge")
//    public String charge(ChargeRequest chargeRequest)
//            throws StripeException {
//        chargeRequest.setDescription("Example charge");
//        chargeRequest.setCurrency(ChargeRequest.Currency.PLN);
//        Charge charge = stripeService.charge(chargeRequest);
//        model.addAttribute("id", charge.getId());
//        model.addAttribute("status", charge.getStatus());
//        model.addAttribute("chargeId", charge.getId());
//        model.addAttribute("balance_transaction", charge.getBalanceTransaction());
//        return "result";
//    }
}
