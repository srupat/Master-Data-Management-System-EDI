package com.example.Sample.SpringTest.controller;

import java.util.regex.Pattern;
import java.util.regex.Matcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Sample.SpringTest.collection.Template;
import com.example.Sample.SpringTest.service.TemplateService;


@RestController
@RequestMapping("/template")
public class TemplateController {
	
	@Autowired
	private TemplateService templateService;
	
	@PostMapping
	public String save(@RequestBody Template template) {		
		System.out.println("post mapping method called");
		try{
			templateService.save(template);
		}
		catch(Exception e) {
			System.err.println(e);
			
		}
		System.out.println("No exception occured");
		return template.toString();
	}
	
	@GetMapping
	public Template getTemplateBytemplatename(@RequestParam("template_name") String template_name){
		try {
			System.out.println("trying getMapping Method");
			return templateService.findByTemplateName(template_name);
						
		}
		catch(Exception e) {
			System.out.println("got some exception !! :(");
			System.err.println(e);
			return null;
		}
		
	}
	
}
