package com.example.Sample.SpringTest.collection;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@Document(collection = "template")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Template {
	
	
	String template_name;
	List<Attribute> attributes;
	public Template() {
		attributes = new ArrayList<>();
	}
	@JsonCreator
	public Template(@JsonProperty("template_name") String template_name) {
		// TODO Auto-generated constructor stub
		this.template_name = template_name;
		attributes = new ArrayList<>();
	}
	@JsonCreator
	public void addAttribute(@JsonProperty("attribute_name")String attribute_name,@JsonProperty("attribute_type") String attribute_type) {
		
		Attribute attribute = new Attribute(attribute_name, attribute_type)	;
		attributes.add(attribute);
	}
}
