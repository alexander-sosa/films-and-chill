package bo.edu.ucb.taller.films_and_chill.token.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.sql.Timestamp;

import javax.persistence.*;

@Entity
@Table(name = "user")
public class DAOUser {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer user_id;
	@Column
	private String name;
	@Column
	private String lastname;
	@Column
	private Integer permission_id;
	@Column(unique = true, name = "email")
	private String username;
	@Column
	@JsonIgnore
	private String pass;
	@Column
	private Boolean tuple_status;
	@Column
	private Timestamp last_update;

	public Integer getUser_id() {
		return this.user_id;
	}

	public void setUser_id(Integer user_id) {
		this.user_id = user_id;
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

	public Integer getPermission_id() {
		return this.permission_id;
	}

	public void setPermission_id(Integer permission_id) {
		this.permission_id = permission_id;
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

	public Boolean isTuple_status() {
		return this.tuple_status;
	}

	public Boolean getTuple_status() {
		return this.tuple_status;
	}

	public void setTuple_status(Boolean tuple_status) {
		this.tuple_status = tuple_status;
	}

	public Timestamp getLast_update() {
		return this.last_update;
	}

	public void setLast_update(Timestamp last_update) {
		this.last_update = last_update;
	}
}
