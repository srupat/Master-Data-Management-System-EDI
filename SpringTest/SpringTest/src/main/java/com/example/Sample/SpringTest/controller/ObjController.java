package com.example.Sample.SpringTest.controller;

import com.example.Sample.SpringTest.collection.Attribute_Object;
import com.example.Sample.SpringTest.collection.Object;
import com.example.Sample.SpringTest.repository.ObjectRepository;
import com.example.Sample.SpringTest.service.TemplateService;
import com.fasterxml.jackson.core.type.TypeReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;

import java.util.List;

import static ObjectMapper.JSON_Parsor.objectMapper;

@RestController
public class ObjController {

    @Autowired
    ObjectRepository orepo;

    @Autowired
    private TemplateService templateService;

    @PostMapping("/create/object")
    public Object submitObject(@RequestBody String jsonString) {
        final ObjectMapper objectMapper = new ObjectMapper();

        try{
            JsonNode jsonNode = objectMapper.readTree(jsonString);

            String objName = jsonNode.get("obj_name").asText();
            String objTemplate = jsonNode.get("obj_template").asText();
            String attributeType = templateService.getAttributeType(objTemplate);
            System.out.println(objName + objTemplate + attributeType);


            List<Attribute_Object> attributes = objectMapper.convertValue(jsonNode.get("attributes"), new TypeReference<List<Attribute_Object>>() {});
            Object obj = new Object(objTemplate, objName, attributes);
            // get the name and val in string from the json string attributes
            for (JsonNode attributeNode : jsonNode.get("attributes")) {
                String attributeName = attributeNode.get("name").asText();
                String attributeValue = attributeNode.get("val").asText();
                System.out.println(attributeName + attributeValue);

                obj.createNewObj(attributeName, attributeValue, attributeType);
            }

            orepo.save(obj);



            }
        catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping("/objects")
    public List<Object> getAllObjects(){
        return orepo.findAll();
    }
}
