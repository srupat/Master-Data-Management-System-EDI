package com.example.Sample.SpringTest.collection;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@Document(collection = "object")
public class Object {
    String obj_template;
    String obj_name;
    List<Attribute_Object> attributes;

    public Object() {
    }

    public void addNewObj(Attribute_Object obj){
        attributes.add(obj);
    }

    public void createNewObj(String )



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
