package interfaces;



import DB.DBUser;
import DB.UserService;

public class connectDao {

	
	public void add(String name,String email,String password){
		UserService userService=new UserService();
		DBUser newUser=new DBUser( name,email,password);
		userService.persist(newUser);
				
	}
}
