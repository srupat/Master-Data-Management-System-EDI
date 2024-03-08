package com.example.Sample.SpringTest.controller;

import com.example.Sample.SpringTest.collection.Attribute_Object;
import com.example.Sample.SpringTest.collection.Data_Expression;
import com.example.Sample.SpringTest.collection.Object;
import com.example.Sample.SpringTest.repository.ObjectRepository;
import com.example.Sample.SpringTest.service.TemplateService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.Sample.SpringTest.service.ObjectService;
import org.springframework.web.bind.annotation.*;
import org.json.JSONArray;
import org.json.JSONObject;
import ObjectMapper.JSON_Parsor;
import java.util.regex.Matcher;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;


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
        Data_Expression dataExpression = new Data_Expression();
    try {

        String objTemplate = jsonObject.getString("template_name");
        String objName = jsonObject.getString("object_name");
        JSONArray attributesArray = jsonObject.getJSONArray("attributes");

        List<Attribute_Object> attributeList = new ArrayList<>();  //
        Object obj = new Object(objTemplate, objName, attributeList);  

        for (int i = 0; i < attributesArray.length(); i++) {

            JSONObject attributeObject = attributesArray.getJSONObject(i);
<<<<<<< HEAD
            String attributeName = attributeObject.getString("name");
            String attributeValue;
            String expression = templateService.getAtrributeExpression(objTemplate, attributeName);
=======
            String attributeName = attributeObject.getString("attribute_name");
            String attributeValue = attributeObject.getString("attribute_value");
>>>>>>> c53f9dc2a1a2f2b3645bc9327bf16b83e66be4ad
            String attributeType = templateService.getAttributeType(objTemplate, attributeName);
            
            if(expression != null) {
            	//change the variables into actual values
               Pattern pattern = Pattern.compile("\\b\\w+\\b");
               Pattern pattern2 = Pattern.compile("^[a-zA-Z]+$");
               Matcher matcher = pattern.matcher(expression);
               while(matcher.find()) {
            	   String word = matcher.group();
            	   Matcher matcher2 = pattern2.matcher(word);
            	   if(matcher2.matches()) {
            		   //the variable value must be obtained and replaced
            		  String value = obj.getAttributeValue(word);     //value was null
            		  expression = expression.replaceAll(word, value);
            	   }
            	   //else do nothing..... skip the word as it is either a numeric or symbolic character
               }
            	Double expressionResult = dataExpression.evaluate(expression);
            	attributeValue = String.valueOf(expressionResult);            	
            }else {
            	attributeValue = attributeObject.getString("val");
            }
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
