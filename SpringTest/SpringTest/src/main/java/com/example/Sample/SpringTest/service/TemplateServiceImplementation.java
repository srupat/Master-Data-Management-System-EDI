package com.example.Sample.SpringTest.service;
import java.util.List;

import com.example.Sample.SpringTest.collection.Attribute_Template;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.example.Sample.SpringTest.collection.Template;
import com.example.Sample.SpringTest.repository.TemplateRepository;


@Service
public class TemplateServiceImplementation implements TemplateService {

	@Autowired
	private TemplateRepository templateRepository;


	
	@Override
	public String save(Template template) {
		// TODO Auto-generated method stub
		
		templateRepository.save(template);
		return "";//getPersonId method is missing ???
				
	}

	@Override
	public List<Template> getAllTemplates() {
		// TODO Auto-generated method stub
		return templateRepository.findAll();
		
	}

	@Override
	public Template findByTemplateName(String name) {
		// TODO Auto-generated method stub
		return templateRepository.findByTemplateName(name);
		
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

}