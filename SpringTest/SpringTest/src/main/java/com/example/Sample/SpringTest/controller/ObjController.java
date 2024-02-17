package com.example.Sample.SpringTest.controller;

import com.example.Sample.SpringTest.collection.Attribute_Object;
import com.example.Sample.SpringTest.collection.Object;
import com.example.Sample.SpringTest.collection.Template;
import com.example.Sample.SpringTest.repository.ObjectRepository;
import com.example.Sample.SpringTest.service.TemplateService;
import com.fasterxml.jackson.core.type.TypeReference;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.Sample.SpringTest.service.ObjectService;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import org.json.JSONArray;
import org.json.JSONObject;
import ObjectMapper.JSON_Parsor;

import java.util.ArrayList;
import java.util.List;

import static ObjectMapper.JSON_Parsor.objectMapper;

@RestController
public class ObjController {

    @Autowired
    ObjectRepository orepo;

    @Autowired
    private TemplateService templateService;

    @Autowired
    private ObjectService oservice;

    @PostMapping("/create/object")
    public Object submitObject(@RequestBody String json) throws JSONException {
        JSONObject jsonObject = new JSONObject(json);

    try {

        String objTemplate = jsonObject.getString("obj_template");
        String objName = jsonObject.getString("obj_name");
        JSONArray attributesArray = jsonObject.getJSONArray("attributes");

        List<Attribute_Object> attributeList = new ArrayList<>();
        Object obj = new Object(objTemplate, objName, attributeList);



        for (int i = 0; i < attributesArray.length(); i++) {

            JSONObject attributeObject = attributesArray.getJSONObject(i);
            String attributeName = attributeObject.getString("name");
            String attributeValue = attributeObject.getString("val");
            String attributeType = templateService.getAttributeType(objTemplate, attributeName);

            Attribute_Object attribute = obj.createNewObj(attributeName, attributeValue, attributeType);
        }

        System.out.println(attributeList);
        orepo.save(obj);
    }
    catch(Exception e){
        e.printStackTrace();
    }

        return null;
    }

    @GetMapping("/objects")
    public List<Object> getAllObjects() {
        try {
            return orepo.findAll();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping("/object/{obj_name}")
    @ResponseBody
    public String getTemplateBytemplatename(@PathVariable String obj_name){
        try {
            System.out.println("trying getMapping Method");
            Object object =  oservice.findByObjName(obj_name);
            String json =  JSON_Parsor.toJson(object);
            return json;

        }
        catch(Exception e) {
            System.out.println("got some exception !! :(");
            System.err.println(e);
            return null;
        }

    }
}
