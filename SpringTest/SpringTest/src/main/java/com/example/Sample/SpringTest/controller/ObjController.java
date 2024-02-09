package com.example.Sample.SpringTest.controller;

import com.example.Sample.SpringTest.collection.Object;
import com.example.Sample.SpringTest.repository.ObjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ObjController {

    @Autowired
    ObjectRepository orepo;

    @PostMapping("/create/object")
    public Object submitObject(@RequestBody Object object) { return orepo.save(object); }

    @GetMapping("/objects")
    public List<Object> getAllObjects(){
        return orepo.findAll();
    }
}
