package bo.edu.ucb.taller.films_and_chill.dto;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/*
CREATE TABLE purchase(
	purchaseid int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	userid int NOT NULL,
	totalcost double(5, 2) NOT NULL,
	purchasedate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	address text,
	tuplestatus bool DEFAULT 1,
  	lastupdate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
	FOREIGN KEY (userid) REFERENCES user(userid)
);
*/

@Entity
@Table(name = "purchase")
public class Purchase {
    
    @Id
    @Column(name="purchaseid")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer purchaseid;
    @Column
    private Integer userid;
    @Column
    private Double totalcost;
    @Column
    private Timestamp purchasedate;
    @Column
    private String address;
    @Column
    private Boolean tuplestatus;
    @Column
    private Timestamp lastupdate;

    public Purchase() 
    {

    }

    public Integer getPurchaseid() {
        return this.purchaseid;
    }

    public void setPurchaseid(Integer purchaseid) {
        this.purchaseid = purchaseid;
    }

    public Integer getUserid() {
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
}
