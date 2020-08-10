package pl.adrian.clothesshop.services;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import pl.adrian.clothesshop.models.Product;
import pl.adrian.clothesshop.models.payload.request.ProductRequest;

import java.util.List;
import java.util.Set;

public interface ProductService {

    List<Product> getAllProducts();

    List<Product> getUserProducts();

    Product getProduct(Long id);

    void addProduct(ProductRequest productRequest);

    void addProduct(Product product);

    //void saveImageFile(Long productId, MultipartFile main_image, MultipartFile image2, MultipartFile image3);
}
