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

    private String username;

    private String description;

    private String size;

    private Boolean featured;

    private Boolean freeShipping;

    private String main_image;

    private String image2;

    private String image3;
}
