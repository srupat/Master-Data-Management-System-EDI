package com.example.Sample.SpringTest.collection;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "template")
public class Template {


	@Id
	private int id;
	private String template_name;
	private List<Attribute_Template> attributes;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
		
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
	
	public Template attachExpressionToAttribute(String attributeName, String Expression) {
		for(int i = 0 ; i < attributes.size(); i++) {
			if(attributes.get(i).getAttribute_name().equals(attributeName)) {
				attributes.get(i).attachExpression(Expression);
			}
		}
		return this;
	}
	
}
