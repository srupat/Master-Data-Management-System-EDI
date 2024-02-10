package com.example.Sample.SpringTest.collection;

import org.springframework.data.mongodb.core.mapping.Document;

import java.lang.Float;
import java.util.List;

import java.lang.*;


@Document(collection = "object")
public class Object {
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

    public void createNewObj(String name, String val, String type){
        // check from the template the datatype of this object having the same name
        switch(type){
            case "int":
                try {
                    Attribute_Object obj = new Int(name, Integer.parseInt(val));
                    addNewObj(obj);
                } catch (NumberFormatException e) {
                    throw new RuntimeException(e);
                }
                break;
            case "float":
                try {
                    Attribute_Object obj;
                    obj = new com.example.Sample.SpringTest.collection.Float(name, Float.parseFloat(val));
                    addNewObj(obj);
                } catch (NumberFormatException e) {
                    throw new RuntimeException(e);
                }
                break;
            case "bool":
                try {
                    Attribute_Object obj;
                    obj = new com.example.Sample.SpringTest.collection.Bool(name, Boolean.parseBoolean(val));
                    addNewObj(obj);
                } catch (NumberFormatException e) {
                    throw new RuntimeException(e);
                }
                break;
            default:
                try {
                    Attribute_Object obj;
                    obj = new com.example.Sample.SpringTest.collection.Strings(name, val);
                    addNewObj(obj);
                } catch (NumberFormatException e) {
                    throw new RuntimeException(e);
                }
                break;
            // for parsing of obj type, first form an object using jackson from the given json
        }

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


}
