package com.example.Sample.SpringTest.collection;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.lang.Float;
import java.math.BigInteger;
import java.util.List;

@Document(collection = "object")
public class Object {

    @Id
    private BigInteger id;

    public BigInteger getId() {
        return id;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    String obj_template;
    String obj_name;
    List<Attribute_Object> attributes;

    public Object(String obj_template, String obj_name, List<Attribute_Object> attributes) {
        this.obj_template = obj_template;
        this.obj_name = obj_name;
        this.attributes = attributes;
    }

    public void addNewObj(Attribute_Object obj){
        attributes.add(obj);
    }

    public Attribute_Object createNewObj(String name, String val, String type){
        // check from the template the datatype of this object having the same name
        Attribute_Object obj;
        switch(type){
            case "int":
                try {
                    obj = new Int(name, Integer.parseInt(val));
                    addNewObj(obj);
                } catch (NumberFormatException e) {
                    throw new RuntimeException(e);
                }
                break;
            case "float":
                try {
                	//  Attribute_Object obj;
                    obj = new com.example.Sample.SpringTest.collection.Float(name, Float.parseFloat(val));
                    addNewObj(obj);
                } catch (NumberFormatException e) {
                    throw new RuntimeException(e);
                }
                break;
            case "bool":
                try {
//                    Attribute_Object obj;
                    obj = new com.example.Sample.SpringTest.collection.Bool(name, Boolean.parseBoolean(val));
                    addNewObj(obj);
                } catch (NumberFormatException e) {
                    throw new RuntimeException(e);
                }
            case "double":
                try {
//                    Attribute_Object obj;
                    obj = new com.example.Sample.SpringTest.collection.Double(name, java.lang.Double.parseDouble(val));
                    addNewObj(obj);
                } catch (NumberFormatException e) {
                    throw new RuntimeException(e);
                }
                break;
            default:
                try {
//                    Attribute_Object obj;
                    obj = new com.example.Sample.SpringTest.collection.Strings(name, val);
                    addNewObj(obj);
                } catch (NumberFormatException e) {
                    throw new RuntimeException(e);
                }
                break;
            // for parsing of obj type, first form an object using jackson from the given json
        }
        return obj;

    }
    
    public String getObj_template() {
        return obj_template;
    }

    @Override
    public String toString() {
        return "Object{" +
                "obj_template='" + obj_template + '\'' +
                ", obj_name='" + obj_name + '\'' +
                ", attributes=" + attributes +
                '}';
    }

    public void setObj_template(String obj_template) {
        this.obj_template = obj_template;
    }

    public String getObj_name() {
        return obj_name;
    }

    public void setObj_name(String obj_name) {
        this.obj_name = obj_name;
    }

    public List<Attribute_Object> getAttributes() {
        return attributes;
    }

    public void setAttributes(List<Attribute_Object> attributes) {
        this.attributes = attributes;
    }

    public String getAttributeValue(String attributeName) {		
    	for(Attribute_Object element : attributes) {
    		if(element.getName().equals(attributeName)) {
    			return element.getVal();
    		}
    	}
    	return null;
    }
    
    public String getAttributeType(String attributeName) {		
    	for(Attribute_Object element : attributes) {
    		if(element.getName().equals(attributeName)) {
    			return element.getVal();
    		}
    	}
    	return null;
    }
    
    public Attribute_Object getAttributeObject(String attributeName) {		
    	for(Attribute_Object element : attributes) {
    		if(element.getName().equals(attributeName)) {
    			return element;
    		}
    	}
    	return null;
    }
}
