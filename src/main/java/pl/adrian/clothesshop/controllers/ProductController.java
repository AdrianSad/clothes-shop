package pl.adrian.clothesshop.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.adrian.clothesshop.models.Product;
import pl.adrian.clothesshop.models.payload.request.ProductRequest;
import pl.adrian.clothesshop.security.UserDetailsImpl;
import pl.adrian.clothesshop.services.ProductService;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public Iterable<Product> getAllProducts(){
        return productService.getAllProducts();
    }

    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    @GetMapping("/user")
    public Iterable<Product> getUserProducts(){
        return productService.getUserProducts();
    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id){
        return productService.getProduct(id);
    }

    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> addProduct(@RequestBody ProductRequest productRequest){

        productService.addProduct(productRequest);

        return ResponseEntity.ok("Product added successfully!");
    }
}
