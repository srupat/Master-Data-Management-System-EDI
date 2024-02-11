package com.example.Sample.SpringTest.collection;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Attribute_Object {
    protected String name;
    // will need to add the val according to data type

    @JsonCreator
    public Attribute_Object(@JsonProperty("name") String name){
        this.name = name;
    }
}

class Int extends Attribute_Object{
    private int val;
    @JsonCreator
    public Int(@JsonProperty("name") String name,@JsonProperty("val") int val){
        super(name);
        this.val = val;
    }
}

class Float extends Attribute_Object{
    private float val;
    @JsonCreator
    public Float(@JsonProperty("name") String name,@JsonProperty("val") float val){
        super(name);
        this.val = val;
    }
}

class Strings extends Attribute_Object{
    private String val;
    @JsonCreator
    public Strings(@JsonProperty("name") String name,@JsonProperty("val") String val){
        super(name);
        this.val = val;
    }
}

class Bool extends Attribute_Object{
    private boolean val;
    @JsonCreator
    public Bool(@JsonProperty("name") String name,@JsonProperty("val") boolean val){
        super(name);
        this.val = val;
    }
}

class ObjType extends Attribute_Object{
    private Object obj;


    @JsonCreator
    public ObjType(@JsonProperty("name") String name,@JsonProperty("val") Object obj){
        super(name);
        this.obj = obj;
    }
}

