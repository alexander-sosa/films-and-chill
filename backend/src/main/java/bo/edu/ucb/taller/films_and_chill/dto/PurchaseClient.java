package bo.edu.ucb.taller.films_and_chill.dto;

//import javax.persistence.Column;
//import java.sql.Timestamp;

public class PurchaseClient{

    private Purchase purchase;
    private String client;

    public PurchaseClient() 
    {
        
    }

    public Purchase getPurchase() {
        return this.purchase;
    }

    public void setPurchase(Purchase purchase) {
        this.purchase = purchase;
    }

    public String getClient() {
        return this.client;
    }

    public void setClient(String client) {
        this.client = client;
    }
}
