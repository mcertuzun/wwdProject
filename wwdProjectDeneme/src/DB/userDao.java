package DB;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;

public class userDao {
	private Session currentSession;
	private Transaction currentTransaction;

public userDao(){
	
}
public Session openCurrentSession(){
	currentSession= getSessionFactory().openSession();
	 return currentSession;
	
}
public Session openCurrentSessionwithTransaction(){
	currentSession= getSessionFactory().openSession();
	currentTransaction= currentSession.beginTransaction();
	return currentSession;
}
public void closeCurrentSession(){
	currentSession.close();
}
public void closeCurrentSessionswithTransaction(){
	currentTransaction.commit();
	currentSession.close();
}
private static SessionFactory getSessionFactory(){
	
	Configuration configuration = new Configuration().configure("resources/DBUser.cfg.xml");
	configuration.addAnnotatedClass(DBUser.class);
	StandardServiceRegistryBuilder builder = new StandardServiceRegistryBuilder().applySettings(configuration.getProperties());
	SessionFactory sessionFactory = configuration.buildSessionFactory(builder.build());
	return sessionFactory;
}
public Session getCurrentSession() {
	return currentSession;
}

public void setCurrentSession(Session currentSession) {
	this.currentSession = currentSession;
}

public Transaction getCurrentTransaction() {
	return currentTransaction;
}

public void setCurrentTransaction(Transaction currentTransaction) {
	this.currentTransaction = currentTransaction;
}

public void persist(DBUser entity) {
	getCurrentSession().save(entity);
}

public void update(DBUser entity) {
	getCurrentSession().update(entity);
}

public DBUser findById(String id) {
	DBUser book = (DBUser) getCurrentSession().get(DBUser.class, id);
	return book; 
}

public void delete(DBUser entity) {
	getCurrentSession().delete(entity);
}

@SuppressWarnings("unchecked")
public List<DBUser> findAll() {
	List<DBUser> books = (List<DBUser>) getCurrentSession().createQuery("from Book").list();
	return books;
}

public void deleteAll() {
	List<DBUser> entityList = findAll();
	for (DBUser entity : entityList) {
		delete(entity);
	}
}

}
