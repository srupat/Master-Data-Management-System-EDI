package com.example.Sample.SpringTest.collection;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import org.bson.codecs.pojo.annotations.BsonId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "template")
public class Template {


	@Id
	private BigInteger id;
	private String template_name;
	private List<Attribute_Template> attributes;
	private List<MDM_Expressions> expressionList;
	
	public BigInteger getId() {
		return id;
	}
	public void setId(BigInteger id) {
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
	public List<MDM_Expressions> getExpressionList() {
		return expressionList;
	}
	public void setExpressionList(List<MDM_Expressions> expressionList) {
		this.expressionList = expressionList;
	}
	
	public MDM_Expressions findExpressionByName(String name) {
		for(MDM_Expressions element : expressionList ) {
			if(element.getName().equals(name)) {
				return element;
			}
		}
		return null;
	}
	
	public void addTemplateExpression(MDM_Expressions obj) {
		if(expressionList == null) {
			expressionList = new  ArrayList<>();
		}
		expressionList.add(obj);
	}
	
	
}
