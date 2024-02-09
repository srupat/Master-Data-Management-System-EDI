package com.example.Sample.SpringTest.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.Sample.SpringTest.collection.Template;
import com.example.Sample.SpringTest.service.TemplateService;
import com.fasterxml.jackson.databind.JsonNode;

import ObjectMapper.JSON_Parsor;


@RestController
//@RequestMapping("/template")
public class TemplateController {
	
	@Autowired
	private TemplateService templateService;
	
	@PostMapping("/create/template")
	public Template save(@RequestBody String json) {		
		System.out.println("post mapping method called");
		try{
			JsonNode jNode = JSON_Parsor.parse(json);
			System.out.println(jNode.get("template_name").toString());
			Template template = JSON_Parsor.fromJson(jNode, Template.class);
			templateService.save(template);
		}
		catch(Exception e) {
			System.err.println(e);
			
		}
		System.out.println("No exception occured");
		return null;//template.toString();
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
	
}
