package com.example.Sample.SpringTest.controller;

import com.example.Sample.SpringTest.repository.TemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.Sample.SpringTest.collection.Template;
import com.example.Sample.SpringTest.service.TemplateService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import ObjectMapper.JSON_Parsor;

import java.util.List;
import java.util.Optional;


@RestController
//@RequestMapping("/template")
public class TemplateController {

	@Autowired
	private TemplateService templateService;
	@Autowired
	private TemplateRepository trepo;	
	private int templateCount = 0;
	
	@PostMapping("/create/template")
	public Template save(@RequestBody Template temp) {
		System.out.println("post mapping method called");
		try{
			temp.setId(templateCount);
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

	@DeleteMapping("/delete/{name}")
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
	
	@PutMapping("/template/attach_expression/{templateName}/{attributeName}/{Expression}")
	public void attachExpressionToTemplateAttribute(@PathVariable String templateName, @PathVariable String attributeName, @PathVariable String Expression) throws JsonMappingException, JsonProcessingException {	
		Optional<Template> optionalTemplate = Optional.of(templateService.findByTemplateName(templateName));
		System.out.println("Attaching the expression to the template...");
		if(optionalTemplate.isPresent()) {
			Template template = optionalTemplate.get();			
			template.attachExpressionToAttribute(attributeName, Expression);
			deleteByName(templateName);
			templateService.save(template);
		}else {
			System.out.println("No object found");
		}
		System.out.println("Expression attached ");
	}
}
