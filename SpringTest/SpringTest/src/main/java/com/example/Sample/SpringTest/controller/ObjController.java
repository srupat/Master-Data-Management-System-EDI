package com.example.Sample.SpringTest.controller;

import com.example.Sample.SpringTest.collection.Attribute_Object;
import com.example.Sample.SpringTest.collection.Object;
import com.example.Sample.SpringTest.repository.ObjectRepository;
import com.example.Sample.SpringTest.service.TemplateService;
import com.fasterxml.jackson.core.type.TypeReference;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import static ObjectMapper.JSON_Parsor.objectMapper;

@RestController
public class ObjController {

    @Autowired
    ObjectRepository orepo;

    @Autowired
    private TemplateService templateService;

    @PostMapping("/create/object")
    public Object submitObject(@RequestBody String json) throws JSONException {
        JSONObject jsonObject = new JSONObject(json);

        String objTemplate = jsonObject.getString("obj_template");
        String objName = jsonObject.getString("obj_name");
        JSONArray attributesArray = jsonObject.getJSONArray("attributes");

       List<Attribute_Object> attributeList = new ArrayList<>();
       Object obj = new Object(objTemplate, objName, attributeList);

        String attributeType = templateService.getAttributeType(objTemplate);

        for (int i = 0; i < attributesArray.length(); i++) {
            JSONObject attributeObject = attributesArray.getJSONObject(i);
            String attributeName = attributeObject.getString("name");
            String attributeValue = attributeObject.getString("val");

            Attribute_Object attribute = obj.createNewObj(attributeName, attributeValue, attributeType);
        }

        System.out.println(attributeList);
        orepo.save(obj);

        return null;
    }

    @GetMapping("/objects")
    public List<Object> getAllObjects(){
        return orepo.findAll();
    }
}
