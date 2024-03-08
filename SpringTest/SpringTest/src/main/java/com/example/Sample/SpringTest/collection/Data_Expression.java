package com.example.Sample.SpringTest.collection;

import net.objecthunter.exp4j.Expression;
import net.objecthunter.exp4j.ExpressionBuilder;

public class Data_Expression {
	
private String expression;
	
	public Data_Expression(String name, String expression) {        //constructor for derived attribute object -> name is the name of the attribute and the expression is the value deriving expression
		
		// TODO Auto-generated constructor stub
		this.expression = expression;
		evaluate(this.expression);
	}
	
	public Data_Expression() {}

	public double  evaluate(String expression) {
		
		ExpressionBuilder builder = new ExpressionBuilder(expression);
		 Expression expr = builder.build(); 
		double result = expr.evaluate();
		return result;
	}
}
