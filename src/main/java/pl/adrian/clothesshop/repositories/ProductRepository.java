package pl.adrian.clothesshop.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import pl.adrian.clothesshop.models.Product;

import java.math.BigDecimal;

public interface ProductRepository extends PagingAndSortingRepository<Product, Long> {

    Iterable<Product> findAllByUsername(String username);

    Page<Product> findAll(Pageable pageable);

    Page<Product> findAllByTitleContainingIgnoreCase(Pageable pageable, String title);

    Page<Product> findAllByFreeShipping(Pageable pageable, boolean freeShipping);

    Page<Product> findAllByPriceLessThan(Pageable pageable, BigDecimal price);

    Page<Product> findAllBySize(Pageable pageable, String size);

    // ==============================

    Page<Product> findAllByTitleContainingIgnoreCaseAndSize(Pageable pageable, String title, String size);

    Page<Product> findAllByPriceLessThanAndSize(Pageable pageable, BigDecimal price, String size);

    Page<Product> findAllByFreeShippingAndSize(Pageable pageable, boolean freeShipping, String size);

    Page<Product> findAllByTitleContainingIgnoreCaseAndFreeShipping(Pageable pageable, String title, boolean freeShipping);

    Page<Product> findAllByTitleContainingIgnoreCaseAndPriceLessThan(Pageable pageable, String title, BigDecimal price);

    Page<Product> findAllByFreeShippingAndPriceLessThan(Pageable pageable, boolean freeShipping, BigDecimal price);

    // ==============================


    Page<Product> findAllByTitleContainingIgnoreCaseAndFreeShippingAndSize(Pageable pageable, String title, boolean freeShipping, String size);

    Page<Product> findAllByTitleContainingIgnoreCaseAndFreeShippingAndPriceLessThan(Pageable pageable, String title, boolean freeShipping, BigDecimal price);

    Page<Product> findAllByTitleContainingIgnoreCaseAndSizeAndPriceLessThan(Pageable pageable, String title, String size, BigDecimal price);

    Page<Product> findAllBySizeAndFreeShippingAndPriceLessThan(Pageable pageable, String size, boolean freeShipping, BigDecimal price);

    // ==============================

    Page<Product> findAllByTitleContainingIgnoreCaseAndFreeShippingAndPriceLessThanAndSize(Pageable pageable, String title, boolean freeShipping, BigDecimal price, String size);

    Iterable<Product> findAllByFeatured(boolean featured);


}
