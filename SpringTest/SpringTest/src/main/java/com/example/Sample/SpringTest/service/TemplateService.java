package com.example.Sample.SpringTest.service;

import java.util.List;

import com.example.Sample.SpringTest.collection.MDM_Expressions;
import com.example.Sample.SpringTest.collection.Template;

public interface TemplateService {

	String save(Template template);
	
	List<Template> getAllTemplates();
	
	void deleteTemplate(Template template);
	
	Template findByTemplateName(String templateName);

	String getAttributeType(String templateName, String att_name);
	
	String getAtrributeExpression(String templateName, String attributeName);
	
	MDM_Expressions findExpressionByName(String name, String templateName);
	
}
