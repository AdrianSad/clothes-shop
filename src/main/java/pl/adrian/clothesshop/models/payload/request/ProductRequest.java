package pl.adrian.clothesshop.models.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.adrian.clothesshop.models.Order;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductRequest implements Serializable {

    private String title;

    private BigDecimal price;

    private Long user_id;

    private String description;

    private String size;

    private Boolean featured;

    private Boolean free_shipping;

    private String main_image;

    private String image2;

    private String image3;
}
