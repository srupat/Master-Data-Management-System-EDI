package com.example.Sample.SpringTest.collection;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "template")
public class Template {
	@Id
	String template_name;

	List<Attribute_Template> attributes;
	
	public String getTemplate_name() {
		return template_name;
	}
	public void setTemplate_name(String template_name) {
		this.template_name = template_name;
	}
	public List<Attribute_Template> getAttributes() {
		return attributes;
	}
	public void setAttributes(List<Attribute_Template> attributes) {
		this.attributes = attributes;
	}
	
	
}
