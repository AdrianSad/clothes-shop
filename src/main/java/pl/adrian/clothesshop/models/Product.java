package pl.adrian.clothesshop.models;

import lombok.*;
import org.hibernate.annotations.GeneratorType;
import org.springframework.core.SpringVersion;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Table(name = "products")
public class Product implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "username")
    private String username;

    @Column(name = "description",columnDefinition = "text")
    private String description;

    @Column(name = "size")
    private String size;

    @Column(name = "featured")
    private Boolean featured;

    @Column(name = "free_shipping")
    private Boolean freeShipping;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="order_id")
    private Order order;

    @Column(name = "main_image",columnDefinition = "text")
    private String main_image;

    @Column(name = "image2",columnDefinition = "text")
    private String image2;

    @Column(name = "image3",columnDefinition = "text")
    private String image3;
}
