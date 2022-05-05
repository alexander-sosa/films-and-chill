package bo.edu.ucb.taller.films_and_chill.token.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.sql.Timestamp;

import javax.persistence.*;

@Entity
@Table(name = "user")
public class DAOUser {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userid;
	@Column
	private String name;
	@Column
	private String lastname;
	@Column
	private Integer permissionid;
	@Column(unique = true, name = "email")
	private String username;
	@Column
	@JsonIgnore
	private String pass;
	@Column
	private Boolean tuplestatus;
	@Column
	private Timestamp lastupdate;

	public Integer getUserid() {
		return this.userid;
	}

	public void setUserid(Integer userid) {
		this.userid = userid;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLastname() {
		return this.lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public Integer getPermissionid() {
		return this.permissionid;
	}

	public void setPermissionid(Integer permissionid) {
		this.permissionid = permissionid;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPass() {
		return this.pass;
	}

	public void setPass(String pass) {
		this.pass = pass;
	}

	public Boolean isTuplestatus() {
		return this.tuplestatus;
	}

	public Boolean getTuplestatus() {
		return this.tuplestatus;
	}

	public void setTuple_status(Boolean tuplestatus) {
		this.tuplestatus = tuplestatus;
	}

	public Timestamp getLastupdate() {
		return this.lastupdate;
	}

	public void setLast_update(Timestamp lastupdate) {
		this.lastupdate = lastupdate;
	}
}
