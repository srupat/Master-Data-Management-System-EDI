package com.example.Sample.SpringTest.controller;

import com.example.Sample.SpringTest.collection.Object;
import com.example.Sample.SpringTest.collection.Plot;
import com.example.Sample.SpringTest.repository.ObjectRepository;
import com.example.Sample.SpringTest.repository.PlotRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PlotController {
    @Autowired
    private PlotRepo repository;

    @Autowired
    private ObjectRepository orepo;

    private List<Plot> objs;
    @PostMapping("/plot")
    void fillLists(){

        List<Object> objects = orepo.findAll();
        for(int i = 0; i < objects.size(); i++){
            Plot obj = new Plot();
            Object temp = objects.get(i);
            obj.timestamp.add(temp.getAttributeValue("timeStamp"));
            obj.inputPower.add(temp.getAttributeValue("inputPower"));
            obj.outputPower.add(temp.getAttributeValue("outputPower"));
            repository.save(obj);
        }

    }
}
