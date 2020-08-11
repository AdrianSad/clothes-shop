package pl.adrian.clothesshop.models.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductResponse implements Serializable {
    private Long id;

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
