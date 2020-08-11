package pl.adrian.clothesshop.services;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import pl.adrian.clothesshop.models.Product;
import pl.adrian.clothesshop.models.payload.request.ProductRequest;
import pl.adrian.clothesshop.models.payload.response.ProductResponse;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Set;

public interface ProductService {

    List<Product> getAllProducts();

    List<Product> getUserProducts();

    ProductResponse getProductResponse(Long id);

    Product getProduct(Long id);

    void addProduct(ProductRequest productRequest);

    void addProduct(Product product);

    ResponseEntity<Map<String, Object>> getFilteredProducts(int page, int size, String title, boolean freeShipping, BigDecimal price, String pSize);

    ResponseEntity<List<ProductResponse>> getAllFeatured();
}
