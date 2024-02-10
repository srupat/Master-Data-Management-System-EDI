package com.example.Sample.SpringTest.service;

import java.util.List;

import com.example.Sample.SpringTest.collection.Template;

public interface TemplateService {

	String save(Template template);

	List<Template> getAllTemplates();
	
	Template findByTemplateName(String templateName);

	String getAttributeType(String templateName);
	
}
