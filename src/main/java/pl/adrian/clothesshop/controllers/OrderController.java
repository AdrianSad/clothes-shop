package pl.adrian.clothesshop.controllers;

import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import pl.adrian.clothesshop.models.Order;
import pl.adrian.clothesshop.models.payload.request.ChargeRequest;
import pl.adrian.clothesshop.models.payload.response.ChargeResponse;
import pl.adrian.clothesshop.models.payload.response.ProductResponse;
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

    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    @PostMapping("/charge")
    public ResponseEntity<ChargeResponse> charge(@RequestBody ChargeRequest chargeRequest)
            throws StripeException {

        try {
            ChargeResponse chargeResponse = new ChargeResponse();
            chargeRequest.setDescription("Example charge");
            chargeRequest.setCurrency(ChargeRequest.Currency.PLN);
            Charge charge = stripeService.charge(chargeRequest);
            chargeResponse.setId(charge.getId());
            chargeResponse.setStatus(charge.getStatus());
            chargeResponse.setChargeId(charge.getId());
            chargeResponse.setBalanceTransaction(charge.getBalanceTransaction());

            return new ResponseEntity<>(chargeResponse, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @ExceptionHandler(StripeException.class)
    public String handleError(Model model, StripeException ex) {
        model.addAttribute("error", ex.getMessage());
        return "result";
    }

}
