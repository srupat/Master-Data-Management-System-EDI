package com.example.Sample.SpringTest.collection;
import java.util.Map;

import com.example.Sample.SpringTest.service.TemplateService;

public abstract class MDM_Expressions {
	protected String name;
	protected String expressionString;

	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	
	public MDM_Expressions(String name, String expressionString) {
		this.name = name;
		this.expressionString = expressionString;
	}
	
	public MDM_Expressions replaceVarsInExpressionString(Map<String, Object> hashMap, TemplateService templateService) {
		String[] words = expressionString.split("\\s+");
		for(String element : words) {
			if (element.matches("[a-zA-Z\\.]+")) {
				String[] components = element.split("\\.");
				Object obj = hashMap.get(components[0]);
				if(components[1].equals("e")) {
					MDM_Expressions nestedExpression = templateService.findExpressionByName(components[2], components[0]);
					nestedExpression = nestedExpression.replaceVarsInExpressionString(hashMap,templateService);
					nestedExpression.expressionString = "(" + nestedExpression.expressionString + ")";
					expressionString = expressionString.replaceAll(element, nestedExpression.expressionString);
				}else {
					String value = obj.getAttributeValue(components[2]) ;
					//value ="(" +  value + ")";
					expressionString = expressionString.replaceAll(element, value);				
				}
			}
		}
		return this;
	}
	
	public String getExpressionString() {
		return this.expressionString;
	}
	
	public abstract String evaluate();
}


