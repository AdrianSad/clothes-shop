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
    @Column(name = "ID")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "price")
    private BigDecimal price;

    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "size")
    private String size;

    @Column(name = "featured")
    private Boolean featured;

    @Column(name = "freeShipping")
    private Boolean freeShipping;

    @Lob
    @Column(name = "image")
    private Byte[] image;
}
