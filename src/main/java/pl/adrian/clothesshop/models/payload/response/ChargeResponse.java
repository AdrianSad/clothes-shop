package pl.adrian.clothesshop.models.payload.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class ChargeResponse implements Serializable {
    private String id;
    private String status;
    private String chargeId;
    private String balanceTransaction;
}
