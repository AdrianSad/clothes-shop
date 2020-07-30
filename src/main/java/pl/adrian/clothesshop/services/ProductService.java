package pl.adrian.clothesshop.services;

import pl.adrian.clothesshop.models.Product;

import java.util.List;
import java.util.Set;

public interface ProductService {

    List<Product> getAllProducts();

    Product getProduct(Long id);

    void addProduct(Product product);
}
