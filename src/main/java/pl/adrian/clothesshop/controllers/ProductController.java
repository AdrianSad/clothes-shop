package pl.adrian.clothesshop.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.adrian.clothesshop.models.Product;
import pl.adrian.clothesshop.models.payload.request.ProductRequest;
import pl.adrian.clothesshop.models.payload.response.ProductResponse;
import pl.adrian.clothesshop.repositories.ProductRepository;
import pl.adrian.clothesshop.services.ProductService;

import java.math.BigDecimal;
import java.util.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;
    private final ProductRepository productRepository;

    public ProductController(ProductService productService, ProductRepository productRepository) {
        this.productService = productService;
        this.productRepository = productRepository;
    }


    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllProducts(@RequestParam(defaultValue = "0") int page,
                                                              @RequestParam(defaultValue = "3") int size,
                                                              @RequestParam(required = false) String title,
                                                              @RequestParam(required = false) boolean freeShipping,
                                                              @RequestParam(required = false) BigDecimal price,
                                                              @RequestParam(required = false) String pSize) {

        return productService.getFilteredProducts(page, size, title, freeShipping, price, pSize);
    }


    @GetMapping("/featured")
    public ResponseEntity<List<ProductResponse>> getAllFeatured() {

        return productService.getAllFeatured();
    }

    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    @GetMapping("/user")
    public Iterable<Product> getUserProducts() {
        return productService.getUserProducts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProduct(@PathVariable String id) {

        try {
            ProductResponse product = productService.getProductResponse(Long.valueOf(id));

            if (product == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> addProduct(@RequestBody ProductRequest productRequest) {

        productService.addProduct(productRequest);

        return ResponseEntity.ok("Product added successfully!");
    }
}
