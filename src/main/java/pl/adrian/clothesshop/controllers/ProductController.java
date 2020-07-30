package pl.adrian.clothesshop.controllers;

import org.springframework.web.bind.annotation.*;
import pl.adrian.clothesshop.models.Product;
import pl.adrian.clothesshop.services.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAllProducts(){
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id){
        return productService.getProduct(id);
    }
}
