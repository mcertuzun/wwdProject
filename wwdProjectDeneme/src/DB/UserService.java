package DB;

import java.util.List;

public class UserService {
	private static userDao userDao;

	public UserService() {
		userDao = new userDao();
	}

	public void persist(DBUser entity) {
		userDao.openCurrentSessionwithTransaction();
		userDao.persist(entity);
		userDao.closeCurrentSessionswithTransaction();
	}

	public void update(DBUser entity) {
		userDao.openCurrentSessionwithTransaction();
		userDao.update(entity);
		userDao.closeCurrentSessionswithTransaction();
	}

	public DBUser findById(String id) {
		userDao.openCurrentSession();
		DBUser book = userDao.findById(id);
		userDao.closeCurrentSession();
		return book;
	}

	public void delete(String id) {
		userDao.openCurrentSessionwithTransaction();
		DBUser book = userDao.findById(id);
		userDao.delete(book);
		userDao.closeCurrentSessionswithTransaction();
	}

	public List<DBUser> findAll() {
		userDao.openCurrentSession();
		List<DBUser> books = userDao.findAll();
		userDao.closeCurrentSession();
		return books;
	}

	public void deleteAll() {
		userDao.openCurrentSessionwithTransaction();
		userDao.deleteAll();
		userDao.closeCurrentSessionswithTransaction();
	}

	public userDao bookDao() {
		return userDao;
	}
}
