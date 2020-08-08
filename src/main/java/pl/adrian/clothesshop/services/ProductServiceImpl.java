package pl.adrian.clothesshop.services;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.adrian.clothesshop.models.Product;
import pl.adrian.clothesshop.models.User;
import pl.adrian.clothesshop.models.payload.request.ProductRequest;
import pl.adrian.clothesshop.repositories.ProductRepository;
import pl.adrian.clothesshop.security.UserDetailsImpl;

import java.util.ArrayList;
import java.util.Base64;
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
    public void addProduct(ProductRequest productRequest) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

        String test = productRequest.getMain_image().split(",")[1];

        Product product = Product.builder()
                .title(productRequest.getTitle())
                .price(productRequest.getPrice())
                .user_id(currentUser.getId())
                .description(productRequest.getDescription())
                .size(productRequest.getSize())
                .featured(productRequest.getFeatured())
                .free_shipping(productRequest.getFree_shipping())
                .main_image(Base64.getDecoder().decode(productRequest.getMain_image().split(",")[1]))
                .image2(Base64.getDecoder().decode(productRequest.getImage2().split(",")[1]))
                .image3(Base64.getDecoder().decode(productRequest.getImage3().split(",")[1]))
                .build();

        productRepository.save(product);
    }

    @Override
    @Transactional
    public void addProduct(Product product) {

        productRepository.save(product);
    }
}
