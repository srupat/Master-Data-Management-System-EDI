package com.example.Sample.SpringTest.collection;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "template")
public class Template {
	
	String template_name;
	List<Attribute> attributes;
	
	public String getTemplate_name() {
		return template_name;
	}
	public void setTemplate_name(String template_name) {
		this.template_name = template_name;
	}
	public List<Attribute> getAttributes() {
		return attributes;
	}
	public void setAttributes(List<Attribute> attributes) {
		this.attributes = attributes;
	}
	
	
}
