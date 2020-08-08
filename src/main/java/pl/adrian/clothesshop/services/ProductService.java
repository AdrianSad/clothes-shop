package pl.adrian.clothesshop.services;

import pl.adrian.clothesshop.models.Product;
import pl.adrian.clothesshop.models.payload.request.ProductRequest;

import java.util.List;
import java.util.Set;

public interface ProductService {

    List<Product> getAllProducts();

    Product getProduct(Long id);

    void addProduct(ProductRequest productRequest);

    void addProduct(Product product);
}
