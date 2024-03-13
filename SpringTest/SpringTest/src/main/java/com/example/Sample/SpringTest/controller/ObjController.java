package com.example.Sample.SpringTest.controller;

import com.example.Sample.SpringTest.collection.Attribute_Object;
import com.example.Sample.SpringTest.collection.MDM_Expressions;
import com.example.Sample.SpringTest.collection.ArithmeticExpression;
import com.example.Sample.SpringTest.collection.Object;
import com.example.Sample.SpringTest.collection.Template;
import com.example.Sample.SpringTest.repository.ObjectRepository;
import com.example.Sample.SpringTest.service.TemplateService;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.Sample.SpringTest.service.ObjectService;
import org.springframework.web.bind.annotation.*;
import org.json.JSONArray;
import org.json.JSONObject;
import ObjectMapper.JSON_Parsor;
import java.util.ArrayList;
import java.util.List;


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
        String objTemplate = jsonObject.getString("template_name");
        String objName = jsonObject.getString("object_name");
        JSONArray attributesArray = jsonObject.getJSONArray("attributes");

        List<Attribute_Object> attributeList = new ArrayList<>();  //
        Object obj = new Object(objTemplate, objName, attributeList);  

        for (int i = 0; i < attributesArray.length(); i++) {
            JSONObject attributeObject = attributesArray.getJSONObject(i);

            String attributeName = attributeObject.getString("attribute_name");
            String attributeValue;
            String expression = templateService.getAtrributeExpression(objTemplate, attributeName);
            String attributeType = templateService.getAttributeType(objTemplate, attributeName);
            MDM_Expressions expressionObj = new ArithmeticExpression("blank", expression);
            if(expression != null) {
            	//change the variables into actual values
            	attributeValue =  expressionObj.replaceVarsInExpressionString(obj, templateService).evaluate();
            }else {
            	attributeValue = attributeObject.getString("attribute_value");
            }
            obj.createNewObj(attributeName, attributeValue, attributeType);
            System.out.println("Execution until i = " + i);
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
    public String getObjectByObjectname(@PathVariable String obj_name){
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
    
    
    @GetMapping("/evaluate/{templateName}/{expressionName}")
    public String evaluateExpression(@PathVariable String expressionName, @PathVariable String templateName) {
    	List<Object> objects = oservice.getAllObjectsForTemplate(templateName);
    	Template template = templateService.findByTemplateName(templateName);
    	MDM_Expressions obj = template.findExpressionByName(expressionName);
    	for(Object element : objects) {
    		String result = obj.replaceVarsInExpressionString(element, templateService).evaluate();
    		System.out.println(result);
    	}	
    	return null;
    }
}
