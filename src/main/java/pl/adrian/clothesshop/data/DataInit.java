package pl.adrian.clothesshop.data;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import pl.adrian.clothesshop.models.Product;
import pl.adrian.clothesshop.repositories.ProductRepository;

import java.math.BigDecimal;

public class DataInit implements CommandLineRunner {

    private final ProductRepository productRepository;

    public DataInit(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        Product p1 = Product.builder().id(1L).title("test1").price(new BigDecimal(123)).featured(true).build();
        Product p2 = Product.builder().id(2L).title("test2").price(new BigDecimal(124)).featured(false).build();

        productRepository.save(p1);
        productRepository.save(p2);
    }
}
