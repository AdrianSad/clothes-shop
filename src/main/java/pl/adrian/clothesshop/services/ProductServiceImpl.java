package pl.adrian.clothesshop.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.adrian.clothesshop.models.Product;
import pl.adrian.clothesshop.models.User;
import pl.adrian.clothesshop.repositories.ProductRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getAllProducts() {
        List<Product> products = new ArrayList<>();

        productRepository.findAll().iterator().forEachRemaining(products::add);

        return products;
    }

    @Override
    public Product getProduct(Long id) {
        Optional<Product> productOptional = productRepository.findById(id);

        if(productOptional.isPresent()){
            return productOptional.get();
        } else {
            throw new RuntimeException("Product Not Found");
        }
    }

    @Override
    @Transactional
    public void addProduct(Product product) {
        productRepository.save(product);
    }
}
