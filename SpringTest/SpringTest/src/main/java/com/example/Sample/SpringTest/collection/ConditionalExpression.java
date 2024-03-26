package com.example.Sample.SpringTest.collection;

public class ConditionalExpression extends MDM_Expressions {

	protected String dataType;
	
	public ConditionalExpression(String name, String expressionString, String dataType) {
		super(name, expressionString);
		this.dataType = dataType;
	}

	// Object
	@Override
	public String evaluate() {
		
		//identify the operands and the operator and convert them into attribute_type objects and then call the evaluate method
		System.out.println("evaluating the expression " + expressionString);
		String[] words = expressionString.split("\\s+");
		System.out.println(words[0]);
		System.out.println(words[1]);
		System.out.println("bef 2");
		System.out.println(words[2]);
		System.out.println("done");
		Attribute_Object obj1;
		Attribute_Object obj2;
		switch(dataType){
			case "int":
				obj1 = new Int("result", Integer.parseInt(words[0]));

				obj2 = new Int("result", Integer.parseInt(words[2]));

				return String.valueOf(obj1.compare(words[1], obj2));
			case "float":
				obj1 = new Float("result", java.lang.Float.parseFloat(words[0]));
				System.out.println(obj1.toString());
				obj2 = new Float("result", java.lang.Float.parseFloat(words[2]));
				System.out.println(obj2.toString());
				return String.valueOf(obj1.compare(words[1], obj2));
			case "double":
				obj1 = new Double("result", java.lang.Double.parseDouble(words[0]));
				obj2 = new Double("result", java.lang.Double.parseDouble(words[2]));
				return String.valueOf(obj1.compare(words[1], obj2));
			case "String":
				obj1 = new Strings("result", words[0]);
				obj2 = new Strings("result", words[2]);
				return String.valueOf(obj1.compare(words[1], obj2));
			case "boolean":
				obj1 = new Bool("result", java.lang.Boolean.parseBoolean(words[0]));
				obj2 = new Bool("result", java.lang.Boolean.parseBoolean(words[0]));
				return String.valueOf(obj1.compare(words[1], obj2));
				default:
					return "Incorrect datatype";				
		}
	}
	
}
