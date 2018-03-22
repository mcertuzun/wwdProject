package DB;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "DBUser")
public class DBUser implements Serializable {
	 

	@Id @GeneratedValue(strategy=GenerationType.AUTO,generator="User_Id_Seq")
	@SequenceGenerator(name="User_Id_Seq", sequenceName="MY_User_SEQ")
	   @Column(name = "user_Id") 
	private int userId;
	  
	  @Column(name = "user_name")
	private String username;
	  
	  @Column(name = "email")
	private String email;
	  
	  @Column(name = "password")
	private String password;

	public DBUser() {
	}

	public DBUser( String username, String email, String password) {
		super();
		
		this.username = username;
		this.email = email;
		this.password = password;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	
	
	
}