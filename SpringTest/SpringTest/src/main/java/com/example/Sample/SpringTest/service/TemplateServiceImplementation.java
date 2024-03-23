package com.example.Sample.SpringTest.service;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.example.Sample.SpringTest.collection.Attribute_Template;
import com.example.Sample.SpringTest.collection.MDM_Expressions;

import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.UpdateResult;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.example.Sample.SpringTest.collection.Template;
import com.example.Sample.SpringTest.repository.TemplateRepository;
import org.springframework.web.bind.annotation.PathVariable;


@Service
public class TemplateServiceImplementation implements TemplateService {

	@Autowired
	private TemplateRepository templateRepository;

	@Autowired
	MongoClient client;

	@Autowired
	MongoConverter converter;

	@Autowired
	MongoTemplate mongoTemplate;
	
	@Override
	public String save(Template template) {
		
		
		templateRepository.save(template);
		return "";//getPersonId method is missing ???
				
	}

	@Override
	public List<Template> getAllTemplates() {
		
		return templateRepository.findAll();
		
	}

	@Override
	public Template findByTemplateName(String name) {
		
		Template temp = templateRepository.findByTemplateName(name);
		return temp;
		
	}

	@Override
	public String getAttributeType(String templateName, String att_name){
		Template temp = templateRepository.findByTemplateName(templateName);

		if(temp!=null){
			List<Attribute_Template> attributes = temp.getAttributes();
			for(Attribute_Template attribute : attributes){
				if(temp.getTemplate_name().equals(templateName) && att_name.equals(attribute.getAttribute_name())){
					return attribute.getAttribute_type();
				}
			}
		}
		return null;
	}

	@Override
	public void deleteTemplate(Template template) {
		
		if (template != null) {
			templateRepository.delete(template);
			System.out.println("Template deleted successfully");
		} else {
			System.out.println("Template not found for deletion");
		}
	}

	@Override
	public String getAtrributeExpression(String templateName, String attributName) {
		
		Template template = templateRepository.findByTemplateName(templateName);
		if(template !=null){
			List<Attribute_Template> attributes = template.getAttributes();
			for(Attribute_Template attribute : attributes){
				if( attributName.equals(attribute.getAttribute_name())){
					return attribute.getExpression();
				}
			}
		}
		return null;
	}

	@Override
	public MDM_Expressions findExpressionByName(String name, String templateName) {
		
		Template template = templateRepository.findByTemplateName(templateName);
		List<MDM_Expressions> expressionList = template.getExpressionList();
		if(template !=null){
			for(MDM_Expressions expression : expressionList ){
				if( expression.getName().equals(name)){
					return expression;
				}
			}
		}
		return null;
	}

	@Override
	public List<Template> search(String search_query){
		List<Template> templates = new ArrayList<>();

		try {
			MongoDatabase database = client.getDatabase("DataBase1");
			MongoCollection<Document> collection = database.getCollection("template");
			AggregateIterable<Document> result = collection.aggregate(Arrays.asList(new Document("$search",
					new Document("index", "tempIndex")
					.append("text",
					new Document("query", search_query)
					.append("path", "template_name")))));


			result.forEach(doc -> templates.add(converter.read(Template.class, doc)));
			return templates;
		}
		catch(Exception e){
			System.out.println(e.getMessage());
		}
		return null;
	}

	@Override
	public Long updateTemplateName(String oldName, String newName){
		Query query = new Query().addCriteria(Criteria.where("template_name").is(oldName));
		Update update = new Update().set("template_name", newName);

		UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Template.class);
		return updateResult.getModifiedCount();
	}

    @Override
    public Long updateAttributes(String tempName, String oldAttributeName, String newAttributeName, String newAttributeType) {
        Query query = new Query().addCriteria(
                Criteria.where("template_name").is(tempName)
                        .and("attributes.attribute_name").is(oldAttributeName)
        );

        Update update = new Update()
                .set("attributes.$.attribute_name", newAttributeName)
                .set("attributes.$.attribute_type", newAttributeType);

        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, Template.class);
        return updateResult.getModifiedCount();
    }



}
