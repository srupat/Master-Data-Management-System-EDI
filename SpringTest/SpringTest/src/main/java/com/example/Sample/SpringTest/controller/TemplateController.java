package com.example.Sample.SpringTest.controller;

import com.example.Sample.SpringTest.collection.Object;
import com.example.Sample.SpringTest.repository.TemplateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.Sample.SpringTest.collection.Template;
import com.example.Sample.SpringTest.service.TemplateService;
import com.fasterxml.jackson.databind.JsonNode;

import ObjectMapper.JSON_Parsor;

import java.util.List;


@RestController
//@RequestMapping("/template")
public class TemplateController {

	@Autowired
	private TemplateService templateService;


	@Autowired
	private TemplateRepository trepo;
	
	@PostMapping("/create/template")
	public Template save(@RequestBody Template temp) {
		System.out.println("post mapping method called");
		try{
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
			e.printStackTrace();
		}
		return null;
		
	}

	@GetMapping("/templates")
	public List<Template> getAllObjects() {
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
			trepo.delete(templateService.findByTemplateName(name));
			System.out.println("Template deleted successfully");
			}
		catch (Exception e) {
			e.printStackTrace();
		}
	}


}
