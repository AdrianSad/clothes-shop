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

    @Column(name = "user_id")
    private Long user_id;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "size")
    private String size;

    @Column(name = "featured")
    private Boolean featured;

    @Column(name = "free_shipping")
    private Boolean free_shipping;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="order_id")
    private Order order;

    @Lob
    @Column(name = "main_image")
    private byte[] main_image;

    @Lob
    @Column(name = "image2")
    private byte[] image2;

    @Lob
    @Column(name = "image3")
    private byte[] image3;
}
