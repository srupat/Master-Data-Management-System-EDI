package com.example.Sample.SpringTest.service;

import java.util.List;

import com.example.Sample.SpringTest.collection.Object;

public interface ObjectService {
	
    Object findByObjName(String ObjName);
    
    List<Object> getAllObjectsForTemplate(String templateName);

    void deleteObject(Object o);


}
