package pl.adrian.clothesshop.models.payload.request;

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
public class ChargeRequest implements Serializable {

    public enum Currency {
        EUR, USD, PLN;
    }
    private String description;
    private int amount;
    private Currency currency;
    private String stripeEmail;
    private String stripeToken;
}
