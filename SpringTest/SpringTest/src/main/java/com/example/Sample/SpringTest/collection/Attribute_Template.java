package com.example.Sample.SpringTest.collection;

public class Attribute_Template {
	
	private String attribute_name;
	private String attribute_type;
	private String expression;
	
	public String getExpression() {
		return expression;
	}
	public String getAttribute_name() {
		return attribute_name;
	}
	public void setAttribute_name(String attribute_name) {
		this.attribute_name = attribute_name;
	}
	public String getAttribute_type() {
		return attribute_type;
	}
	public void setAttribute_type(String attribute_type) {
		this.attribute_type = attribute_type;
	}
	
	public void attachExpression(String expr) {
		this.expression = expr;
	}
}
