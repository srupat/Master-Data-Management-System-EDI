package com.example.Sample.SpringTest.collection;

public class Attribute_Object {
    protected String name;
    public Attribute_Object(String name){
        this.name = name;
    }
}

class Int extends Attribute_Object{
    private int val;
    public Int(String name,int val){
        super(name);
        this.val = val;
    }
}

class Float extends Attribute_Object{
    private float val;
    public Float(String name,float val){
        super(name);
        this.val = val;
    }
}

class Strings extends Attribute_Object{
    private String val;
    public Strings(String name,String val){
        super(name);
        this.val = val;
    }
}

class Char extends Attribute_Object{
    private char val;
    public Char(String name,char val){
        super(name);
        this.val = val;
    }
}

class Bool extends Attribute_Object{
    private boolean val;
    public Bool(String name,boolean val){
        super(name);
        this.val = val;
    }
}

class ObjType extends Attribute_Object{
    private Object obj;

    public ObjType(String name, Object obj){
        super(name);
        this.obj = obj;
    }
}
