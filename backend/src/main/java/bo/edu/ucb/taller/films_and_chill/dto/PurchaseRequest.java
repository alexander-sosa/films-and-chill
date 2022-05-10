package bo.edu.ucb.taller.films_and_chill.dto;

//import java.sql.Timestamp;

public class PurchaseRequest {

    private Purchase purchase;
    private Moviepurchase [] moviepurchases;

    //private Integer userid;
    //private Double totalcost;
    //private Timestamp purchasedate;
    //private String address;
    //private Integer movieid;
    //private Integer purchaseid;
    //private Integer quantity;
    //private Boolean tuplestatus;
    //private Timestamp lastupdate;


    public PurchaseRequest() {
    }

    public Purchase getPurchase() {
        return this.purchase;
    }

    public void setPurchase(Purchase purchase) {
        this.purchase = purchase;
    }

    public Moviepurchase[] getMoviepurchases() {
        return this.moviepurchases;
    }

    public void setMoviepurchases(Moviepurchase[] moviepurchases) {
        this.moviepurchases = moviepurchases;
    }

    /*public Integer getUserid() {
        return this.userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public Double getTotalcost() {
        return this.totalcost;
    }

    public void setTotalcost(Double totalcost) {
        this.totalcost = totalcost;
    }

    public Timestamp getPurchasedate() {
        return this.purchasedate;
    }

    public void setPurchasedate(Timestamp purchasedate) {
        this.purchasedate = purchasedate;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getMovieid() {
        return this.movieid;
    }

    public void setMovieid(Integer movieid) {
        this.movieid = movieid;
    }

    public Integer getPurchaseid() {
        return this.purchaseid;
    }

    public void setPurchaseid(Integer purchaseid) {
        this.purchaseid = purchaseid;
    }

    public Integer getQuantity() {
        return this.quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Boolean isTuplestatus() {
        return this.tuplestatus;
    }

    public Boolean getTuplestatus() {
        return this.tuplestatus;
    }

    public void setTuplestatus(Boolean tuplestatus) {
        this.tuplestatus = tuplestatus;
    }

    public Timestamp getLastupdate() {
        return this.lastupdate;
    }

    public void setLastupdate(Timestamp lastupdate) {
        this.lastupdate = lastupdate;
    }
*/
}
