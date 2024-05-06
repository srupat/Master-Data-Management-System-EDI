package com.example.Sample.SpringTest.controller;

import com.example.Sample.SpringTest.repository.TemplateRepository;

import com.mongodb.client.result.UpdateResult;
import com.mongodb.internal.bulk.UpdateRequest;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.web.bind.annotation.*;

import com.example.Sample.SpringTest.collection.ArithmeticExpression;
import com.example.Sample.SpringTest.collection.ConditionalExpression;
import com.example.Sample.SpringTest.collection.MDM_Expressions;
import com.example.Sample.SpringTest.collection.Template;
import com.example.Sample.SpringTest.service.TemplateService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import ObjectMapper.JSON_Parsor;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;


@RestController
public class TemplateController {

	@Autowired
	private TemplateService templateService;
	@Autowired
	private TemplateRepository trepo;	
	private int templateCount = 0;

	@Autowired
	MongoTemplate mongoTemplate;
	
	@PostMapping("/create/template")
	public Template createTemplate(@RequestBody Template temp) {
		System.out.println("post mapping method called");
		try{
			temp.setId(BigInteger.valueOf(templateCount));
			templateCount++;
			templateService.save(temp);
		}
		catch(Exception e) {
			System.err.println(e);			
		}
		System.out.println("No exception occured");
		return null;  //template.toString();
	}
	
	@GetMapping("/template/{template_name}")
	@ResponseBody
	public String getTemplateBytemplatename(@PathVariable String template_name){
		try {
			System.out.println("trying getMapping Method");
			Template template =  templateService.findByTemplateName(template_name);
			String json =  JSON_Parsor.toJson(template);
			return json;						
		}
		catch(Exception e) {
			System.out.println("got some exception !! :(");
			System.err.println(e);
			return null;
		}		
	}

	@GetMapping("/templates")
	public List<Template> getAllTemplates() {
		try {
			return trepo.findAll();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@DeleteMapping("/delete/template/{name}")
	@ResponseBody
	public void deleteByName(@PathVariable String name){
		try {
			System.out.println("Deleting template: " + name);

			Template temp = templateService.findByTemplateName(name);
			templateService.deleteTemplate(temp);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@PutMapping("/template/attachAttributeExpression/{templateName}/{attributeName}/{expression}")
	public void attachExpressionToTemplateAttribute(@PathVariable String templateName, @PathVariable String attributeName, @PathVariable String expression) throws JsonMappingException, JsonProcessingException {	
		Optional<Template> optionalTemplate = Optional.of(templateService.findByTemplateName(templateName));
		System.out.println("Attaching the expression to the template...");
		if(optionalTemplate.isPresent()) {
			Template template = optionalTemplate.get();			
			template.attachExpressionToAttribute(attributeName, expression);
			deleteByName(templateName);
			templateService.save(template);
		}else {
			System.out.println("No object found");
		}
		System.out.println("Expression attached ");
	}
	@PutMapping("/template/attachTemplateExpression/{templateName}")
	public void attachExpressionToTemplate(@RequestBody String json, @PathVariable String templateName) throws JSONException {
		JSONObject jsonObj = new JSONObject(json);
		Template template = templateService.findByTemplateName(templateName);
		String type = jsonObj.getString("type");
		MDM_Expressions obj;
		switch(type) {
		case "Arithmetic" :
			 obj = new ArithmeticExpression(jsonObj.getString("name"), jsonObj.getString("expressionString"));
			break;
		case "Conditional" :
			obj = new ConditionalExpression(jsonObj.getString("name"), jsonObj.getString("expressionString"), jsonObj.getString("dataType"));
			break;
			default:
				obj = new ArithmeticExpression(null,null);
				System.out.println("Something went wrong ...inside the default case");
				return;
		}
		
		template.addTemplateExpression(obj);					
		deleteByName(templateName);
		templateService.save(template);
		System.out.println("A new expression is added to the template......");
	}

	@GetMapping("/templates/{text}")
	public List<Template> search(@PathVariable String text){
		System.out.println("Searching for template with name " + text);
		return templateService.search(text);
	}

	@PutMapping("/template/{oldName}/{newName}")
	public void updateName(@PathVariable String oldName, @PathVariable String newName){
		try{
			templateService.updateTemplateName(oldName, newName);
			return;
		}
		catch(Exception e)
		{
			System.out.println("Error"+ e);
		}
	}

	@PutMapping("/attributes/{tempName}/{oldAttributeName}/{newAttributeName}/{newAttributeType}")
	public void updateAttributes(@PathVariable String tempName,@PathVariable String oldAttributeName, @PathVariable String newAttributeName, @PathVariable String newAttributeType){
		try{
			templateService.updateAttributes(tempName,oldAttributeName, newAttributeName, newAttributeType);
			return;
		}
		catch(Exception e)
		{
			System.out.println("Error"+ e);
		}
	}
	
}
