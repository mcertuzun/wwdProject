package DB;

public class Datab {

	public static void main(String[] args) {

		

		UserService userService= new UserService();
		DBUser user1= new DBUser("no","yes","no");
	
		userService.persist(user1);
	}

}
