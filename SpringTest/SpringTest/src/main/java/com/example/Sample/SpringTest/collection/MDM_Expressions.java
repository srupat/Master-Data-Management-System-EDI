package com.example.Sample.SpringTest.collection;
import org.springframework.beans.factory.annotation.Autowired;
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
	
	public MDM_Expressions replaceVarsInExpressionString(Object obj, TemplateService templateService) {
		String[] words = expressionString.split("\\s+");
		for(String element : words) {
			if (element.matches("[a-zA-Z\\.]+")) {
				String[] components = element.split("\\.");
				if(components[1].equals("e")) {
					MDM_Expressions nestedExpression = templateService.findExpressionByName(components[2], components[0]);
					nestedExpression = nestedExpression.replaceVarsInExpressionString(obj,templateService);
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
	public abstract String evaluate();
}


