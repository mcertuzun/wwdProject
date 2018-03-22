package interfaces;

import javax.faces.bean.ManagedBean;


@ManagedBean(name="userRegisterView")
public class userRegisterView {

	private String name;
	private String email;
	private String password;
	
	public void register(connectDao dao){
		dao.add(name, email, password);
	}

	public String getUsername() {
		return name;
	}

	public void setUsername(String name) {
		this.name = name;
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
