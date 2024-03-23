package com.example.Sample.SpringTest.service;

import com.example.Sample.SpringTest.collection.Object;
import com.example.Sample.SpringTest.collection.Template;
import com.example.Sample.SpringTest.repository.ObjectRepository;

import java.util.ArrayList;
import java.util.List;

import com.mongodb.client.result.UpdateResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class ObjectServiceImpl implements ObjectService{

    @Autowired
    private ObjectRepository orepo;

	@Autowired
	MongoTemplate mongoTemplate;
    
    @Override
    public Object findByObjName(String name) {
        return orepo.findByObjectName(name);

    }
	@Override
	public List<Object> getAllObjectsForTemplate(String templateName) {
		
		List<Object> objects = orepo.findAll();
		List<Object> resultList = new ArrayList<>();
		for(Object object : objects) {
			if(object.getObj_template().equals(templateName)) {
				resultList.add(object);
			}
		}
		return resultList;
	}

	@Override
	public void deleteObject(Object obj) {

		if (obj != null) {
			orepo.delete(obj);
			System.out.println("Object deleted successfully");
		} else {
			System.out.println("Object not found for deletion");
		}
	}

	@Override
	public Long updateObjectName(String oldName, String newName){
		Query query = new Query().addCriteria(Criteria.where("obj_name").is(oldName));
		Update update = new Update().set("obj_name", newName);

		UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Object.class);
		return updateResult.getModifiedCount();
	}

	@Override
	public Long updateObjectTemplateName(String oldName, String newName){
		Query query = new Query().addCriteria(Criteria.where("obj_template").is(oldName));
		Update update = new Update().set("obj_template", newName);

		UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Template.class);
		return updateResult.getModifiedCount();
	}
}
