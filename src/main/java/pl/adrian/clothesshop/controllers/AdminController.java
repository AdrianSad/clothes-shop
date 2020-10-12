package pl.adrian.clothesshop.controllers;

import org.springframework.context.annotation.Role;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.adrian.clothesshop.models.Product;
import pl.adrian.clothesshop.models.User;
import pl.adrian.clothesshop.services.ProductService;
import pl.adrian.clothesshop.services.UserService;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserService userService;
    private final ProductService productService;

    public AdminController(UserService userService, ProductService productService) {
        this.userService = userService;
        this.productService = productService;
    }

    @GetMapping("/products")
    public List<Product> getProductsList(){
        return productService.getAllProducts();
    }

    @DeleteMapping("products/{id}")
    public void deleteProduct(@PathVariable Long id){
        productService.deleteProduct(id);
    }
    @GetMapping("/users")
    public List<User> getUsersList(){

        return userService.getAllUsers();
    }
}
