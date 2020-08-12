package pl.adrian.clothesshop.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;
import pl.adrian.clothesshop.models.Product;
import pl.adrian.clothesshop.models.payload.request.ProductRequest;
import pl.adrian.clothesshop.models.payload.response.ProductResponse;
import pl.adrian.clothesshop.repositories.ProductRepository;
import pl.adrian.clothesshop.security.UserDetailsImpl;

import java.math.BigDecimal;
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
    public ProductResponse getProductResponse(Long id) {
        Optional<Product> productOptional = productRepository.findById(id);

        if (productOptional.isPresent()) {

            Product product = productOptional.get();
            ProductResponse productJSON = new ProductResponse(
                    product.getId(),
                    product.getTitle(),
                    product.getPrice(),
                    product.getUsername(),
                    product.getDescription(),
                    product.getSize(),
                    product.getFeatured(),
                    product.getFreeShipping(),
                    product.getMain_image(),
                    product.getImage2(),
                    product.getImage3()
            );
            return productJSON;
        } else {
            throw new RuntimeException("Product Not Found");
        }
    }

    @Override
    public Product getProduct(Long id) {

        Optional<Product> productOptional = productRepository.findById(id);
        if (productOptional.isPresent()) {
            return productOptional.get();
        }else {
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
                .freeShipping(productRequest.getFreeShipping())
                .main_image(productRequest.getMain_image())
                .image2(productRequest.getImage2())
                .image3(productRequest.getImage3())
                .build();

        productRepository.save(product);
    }

    @Override
    @Transactional
    public void addProduct(Product product) {
        productRepository.save(product);
    }

    @Override
    public ResponseEntity<Map<String, Object>> getFilteredProducts(int page, int size, String title,  boolean freeShipping, BigDecimal price, String pSize) {
        try {
            List<ProductResponse> productsJSON = new ArrayList<ProductResponse>();
            Pageable paging = PageRequest.of(page,size, Sort.by("featured").descending());
            Page<Product> productPage;

            if(title == null && !freeShipping && price.equals(BigDecimal.ZERO) && pSize.equals("ALL")){
                productPage = productRepository.findAll(paging);
            } else if(!freeShipping && price.equals(BigDecimal.ZERO) && pSize.equals("ALL")){
                productPage = productRepository.findAllByTitleContainingIgnoreCase(paging, title);
            }else if(title == null && price.equals(BigDecimal.ZERO) && pSize.equals("ALL")){
                productPage = productRepository.findAllByFreeShipping(paging, true);
            }else if(!freeShipping && title == null && pSize.equals("ALL")){
                productPage = productRepository.findAllByPriceLessThan(paging, price);
            } else if(!freeShipping && title == null && price.equals(BigDecimal.ZERO)){
                productPage = productRepository.findAllBySize(paging, pSize);
            }else if(!freeShipping && price.equals(BigDecimal.ZERO)){
                productPage = productRepository.findAllByTitleContainingIgnoreCaseAndSize(paging, title, pSize);
            } else if(!freeShipping && title == null){
                productPage = productRepository.findAllByPriceLessThanAndSize(paging, price, pSize);
            } else if(price.equals(BigDecimal.ZERO) && title == null){
                productPage = productRepository.findAllByFreeShippingAndSize(paging, true, pSize);
            }else if(price.equals(BigDecimal.ZERO) && pSize.equals("ALL")){
                productPage = productRepository.findAllByTitleContainingIgnoreCaseAndFreeShipping(paging, title, true);
            }else if(!freeShipping && pSize.equals("ALL")){
                productPage = productRepository.findAllByTitleContainingIgnoreCaseAndPriceLessThan(paging, title, price);
            }else if(title == null && pSize.equals("ALL")){
                productPage = productRepository.findAllByFreeShippingAndPriceLessThan(paging, true, price);
            }else if(pSize.equals("ALL")){
                productPage = productRepository.findAllByTitleContainingIgnoreCaseAndFreeShippingAndPriceLessThan(paging, title, true, price);
            }else if(price.equals(BigDecimal.ZERO)){
                productPage = productRepository.findAllByTitleContainingIgnoreCaseAndFreeShippingAndSize(paging, title, true, pSize);
            }else if(!freeShipping){
                productPage = productRepository.findAllByTitleContainingIgnoreCaseAndSizeAndPriceLessThan(paging, title, pSize, price);
            }else if(title == null){
                productPage = productRepository.findAllBySizeAndFreeShippingAndPriceLessThan(paging, pSize, true, price);
            } else {
                productPage = productRepository.findAllByTitleContainingIgnoreCaseAndFreeShippingAndPriceLessThanAndSize(paging, title, true, price, pSize);
            }

            if(productPage != null && productPage.hasContent()) {
                productPage.getContent().forEach(product -> {
                    ProductResponse productJSON = new ProductResponse(
                            product.getId(),
                            product.getTitle(),
                            product.getPrice(),
                            product.getUsername(),
                            product.getDescription(),
                            product.getSize(),
                            product.getFeatured(),
                            product.getFreeShipping(),
                            product.getMain_image(),
                            product.getImage2(),
                            product.getImage3()
                    );
                    productsJSON.add(productJSON);
                });
            }
            if(productsJSON.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            Map<String, Object> response = new HashMap<>();
            response.put("products", productsJSON);
            response.put("currentPage", productPage.getNumber());
            response.put("totalItems", productPage.getTotalElements());
            response.put("totalPages", productPage.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<ProductResponse>> getAllFeatured(){
        try {
            Iterable<Product> products = productRepository.findAllByFeatured(true);
            List<ProductResponse> productsJSON = new ArrayList<ProductResponse>();

            products.forEach(product -> {
                ProductResponse productJSON = new ProductResponse(
                        product.getId(),
                        product.getTitle(),
                        product.getPrice(),
                        product.getUsername(),
                        product.getDescription(),
                        product.getSize(),
                        product.getFeatured(),
                        product.getFreeShipping(),
                        product.getMain_image(),
                        product.getImage2(),
                        product.getImage3()
                );
                productsJSON.add(productJSON);
            });

            return new ResponseEntity<>(productsJSON, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
