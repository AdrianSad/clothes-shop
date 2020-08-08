package pl.adrian.clothesshop.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "orders")
public class Order implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "total")
    private BigDecimal total;

    @OneToMany(mappedBy = "order")
    private Set<Product> products = new HashSet<>();

    @Column(name = "stripe_token_id")
    private String stripe_token_id;

    public void addProduct(Product product){
        product.setOrder(this);
    }
}
