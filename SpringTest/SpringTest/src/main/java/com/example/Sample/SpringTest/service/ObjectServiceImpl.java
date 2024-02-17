package com.example.Sample.SpringTest.service;

import com.example.Sample.SpringTest.collection.Object;
import com.example.Sample.SpringTest.repository.ObjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ObjectServiceImpl implements ObjectService{

    @Autowired
    private ObjectRepository orepo;
    @Override
    public Object findByObjName(String name) {
        return orepo.findByObjectName(name);

    }
}
