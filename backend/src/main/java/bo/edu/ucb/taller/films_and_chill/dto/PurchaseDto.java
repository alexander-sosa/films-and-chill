package bo.edu.ucb.taller.films_and_chill.dto;

//import javax.persistence.Column;
import java.sql.Timestamp;

public class PurchaseDto {
    private Integer purchaseid;
    private Integer userid;
    private String name;
    private String lastname;
    private Double totalcost;
    private Timestamp purchasedate;
    private String address;

    public PurchaseDto() 
    {
        
    }

    public PurchaseDto(Integer purchaseid, Integer userid, String name, String lastname, Double totalcost, Timestamp purchasedate, String address) {
        this.purchaseid = purchaseid;
        this.userid = userid;
        this.name = name;
        this.lastname = lastname;
        this.totalcost = totalcost;
        this.purchasedate = purchasedate;
        this.address = address;
    }

    public Integer getPurchaseid() {
        return purchaseid;
    }

    public void setPurchaseid(Integer purchaseid) {
        this.purchaseid = purchaseid;
    }

    public Integer getUserid() {
        return userid;
    }

    public void setUserid(Integer userid) {
        this.userid = userid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Double getTotalcost() {
        return totalcost;
    }

    public void setTotalcost(Double totalcost) {
        this.totalcost = totalcost;
    }

    public Timestamp getPurchasedate() {
        return purchasedate;
    }

    public void setPurchasedate(Timestamp purchasedate) {
        this.purchasedate = purchasedate;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "PurchaseDto{" +
                "purchaseid=" + purchaseid +
                ", userid=" + userid +
                ", name='" + name + '\'' +
                ", lastname='" + lastname + '\'' +
                ", totalcost=" + totalcost +
                ", purchasedate=" + purchasedate +
                ", address='" + address + '\'' +
                '}';
    }
}
