package pl.adrian.clothesshop.services;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.adrian.clothesshop.models.Product;
import pl.adrian.clothesshop.models.payload.request.ProductRequest;
import pl.adrian.clothesshop.repositories.ProductRepository;
import pl.adrian.clothesshop.security.UserDetailsImpl;

import java.util.*;

@Service
public class ProductServiceImpl implements ProductService {

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
    public List<Product> getUserProducts() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl currentUser = (UserDetailsImpl) authentication.getPrincipal();

        List<Product> products = new ArrayList<>();
        productRepository.findAllByUsername(currentUser.getUsername()).forEach(products::add);

        return products;
    }

    @Override
    public Product getProduct(Long id) {
        Optional<Product> productOptional = productRepository.findById(id);

        if (productOptional.isPresent()) {
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

        Product product = Product.builder()
                .title(productRequest.getTitle())
                .price(productRequest.getPrice())
                .username(currentUser.getUsername())
                .description(productRequest.getDescription())
                .size(productRequest.getSize())
                .featured(productRequest.getFeatured())
                .free_shipping(productRequest.getFree_shipping())
                .main_image(Base64.getDecoder().decode(productRequest.getMain_image().split(",")[1]))
                .image2(productRequest.getImage2() != null ? Base64.getDecoder().decode(productRequest.getImage2().split(",")[1]) : null)
                .image3(productRequest.getImage2() != null ? Base64.getDecoder().decode(productRequest.getImage3().split(",")[1]) : null)
                .build();

        productRepository.save(product);
    }

    @Override
    @Transactional
    public void addProduct(Product product) {
        productRepository.save(product);
    }

//    @Override
//    @Transactional
//    public void saveImageFile(Long productId, MultipartFile main_image, MultipartFile image2, MultipartFile image3) {
//
//        Product product = getProduct(productId);
//        product.setMain_image(getBytes(main_image));
//        product.setImage2(getBytes(image2));
//        product.setImage3(getBytes(image3));
//        addProduct(product);
//    }
//
//    private byte[] getBytes(MultipartFile file) {
//
//        try{
//            byte[] byteObject = new byte[file.getBytes().length];
//            int i = 0;
//
//            for(byte b : file.getBytes()){
//                byteObject[i++] = b;
//            }
//
//            return byteObject;
//
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        return new byte[0];
//    }

}
