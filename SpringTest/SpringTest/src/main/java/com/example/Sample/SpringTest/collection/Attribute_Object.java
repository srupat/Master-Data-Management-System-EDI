package com.example.Sample.SpringTest.collection;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public abstract class Attribute_Object {
    protected String name;
    // will need to add the val according to data type
    
    @JsonCreator
    public Attribute_Object(@JsonProperty("name") String name){
        this.name = name;
    }
    
    public String getName() {
    	return this.name;
    }  
    
    public abstract String  getVal(); 
    public abstract String getType();
    public abstract Bool compare(String operation, Attribute_Object obj);
}

class Int extends Attribute_Object{
    private int val;
    @JsonCreator
    public Int(@JsonProperty("name") String name,@JsonProperty("val") int val){
        super(name);
        this.val = val;
    }
    
	public String getVal() {
		
		return String.valueOf(val);
	}
	
	@Override
	public String getType() {
		
		return "int";
	}

	@Override
	public Bool compare(String operation, Attribute_Object obj) {
		
		boolean result = false;
		switch (operation) {
		case "==":
			result = this.val == Integer.parseInt(obj.getVal());
			break;
		case ">":
			result = this.val > Integer.parseInt(obj.getVal());
			break;
		case "<":
			result = this.val < Integer.parseInt(obj.getVal());
			break;
		case "<=":
			result = this.val <= Integer.parseInt(obj.getVal());
			break;
		case ">=":
			result = this.val >= Integer.parseInt(obj.getVal());
			break;
		case "!=":
			result = this.val != Integer.parseInt(obj.getVal());
			break;
		}
		Bool returnObj = new Bool("result", result);
		return returnObj;
	}
	
}

class Float extends Attribute_Object{
    private float val;
    @JsonCreator
    public Float(@JsonProperty("name") String name,@JsonProperty("val") float val){
        super(name);
        this.val = val;
    }
	@Override
	public String getVal() {
		
		return String.valueOf(val);
	}
	@Override
	public String getType() {
		
		return "float";
	}
	@Override
	public Bool compare(String operation, Attribute_Object obj) {
		
		boolean result = false;
		switch (operation) {
		case "==":
			result = this.val == java.lang.Float.parseFloat(obj.getVal());
			break;
		case ">":
			result = this.val > java.lang.Float.parseFloat(obj.getVal());
			break;
		case "<":
			result = this.val < java.lang.Float.parseFloat(obj.getVal());
			break;
		case "<=":
			result = this.val <= java.lang.Float.parseFloat(obj.getVal());
			break;
		case ">=":
			result = this.val >= java.lang.Float.parseFloat(obj.getVal());
			break;
		case "!=":
			result = this.val != java.lang.Float.parseFloat(obj.getVal());
			break;
		}
		Bool returnObj = new Bool("result", result);
		return returnObj;
	}
}

class Strings extends Attribute_Object{
    private String val;
    @JsonCreator
    public Strings(@JsonProperty("name") String name,@JsonProperty("val") String val){
        super(name);
        this.val = val;
    }
	@Override
	public String getVal() {
		
		return val;
	}
	@Override
	public String getType() {
		
		return "String";
	}
	@Override
	public Bool compare(String operation, Attribute_Object obj) {
		
		boolean result = false;
		switch (operation) {
		case "==":
			result = this.val.equals(obj.getVal());
		}
		Bool returnObj = new Bool("result", result);
		return returnObj;
	}
}

class Bool extends Attribute_Object{
    private boolean val;
    @JsonCreator
    public Bool(@JsonProperty("name") String name,@JsonProperty("val") boolean val){
        super(name);
        this.val = val;
    }
	@Override
	public String getVal() {
		
		return String.valueOf(val);
	}
	@Override
	public String getType() {
		
		return "bool";
	}
	@Override
	public Bool compare(String operation, Attribute_Object obj) {
		
		//nothing thought to be done here
		return null;
	}
	public String toString() {
		return  this.val + "";	
	}
}

class Double extends Attribute_Object{
    private double val;
    @JsonCreator
    public Double(@JsonProperty("name") String name,@JsonProperty("val") double  val){
        super(name);
        this.val = val;
    }
	@Override
	public String getVal() {
		
		return String.valueOf(val);
	}
	@Override
	public String getType() {
		
		return "boolean";
	}
	@Override
	public Bool compare(String operation, Attribute_Object obj) {
		
		boolean result = false;
		switch (operation) {
		case "==":
			result = this.val == java.lang.Double.parseDouble(obj.getVal());
			break;
		case ">":
			result = this.val > java.lang.Double.parseDouble(obj.getVal());
			break;
		case "<":
			result = this.val < java.lang.Double.parseDouble(obj.getVal());
			break;
		case "<=":
			result = this.val <= java.lang.Double.parseDouble(obj.getVal());
			break;
		case ">=":
			result = this.val >= java.lang.Double.parseDouble(obj.getVal());
			break;
		case "!=":
			result = this.val != java.lang.Double.parseDouble(obj.getVal());
			break;
		}
		Bool returnObj = new Bool("result", result);
		return returnObj;
	}
}

class ObjType extends Attribute_Object{
    private Object obj;


    @JsonCreator
    public ObjType(@JsonProperty("name") String name,@JsonProperty("val") Object obj){
        super(name);
        this.obj = obj;
    }
    
	@Override
	public String getVal() {
		
		return obj.toString();
	}

	@Override
	public String getType() {
		
		return "Template";
	}

	@Override
	public Bool compare(String operation, Attribute_Object obj) {
		
		//complex object comparison not supported
		return null;
	}
}




























