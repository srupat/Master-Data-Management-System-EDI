package com.example.Sample.SpringTest.collection;

import net.objecthunter.exp4j.Expression;
import net.objecthunter.exp4j.ExpressionBuilder;

public class ArithmeticExpression extends MDM_Expressions {
	
	public ArithmeticExpression(String name, String expressionString) {
		super(name, expressionString);
		// TODO Auto-generated constructor stub
	}

	@Override
	public String  evaluate() {	
		System.out.println("evaluating the expression " + expressionString);
		ExpressionBuilder builder = new ExpressionBuilder(expressionString);
		Expression expr = builder.build(); 
		double result = expr.evaluate();
		return String.valueOf(result);
	}
}


