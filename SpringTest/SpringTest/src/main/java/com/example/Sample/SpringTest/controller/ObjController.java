package com.example.Sample.SpringTest.controller;

import com.example.Sample.SpringTest.collection.Attribute_Object;
import com.example.Sample.SpringTest.collection.ConditionalExpression;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;


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
            	HashMap<String, Object> hashmap = new HashMap<>();
            	hashmap.put(objTemplate, obj);
            	attributeValue =  expressionObj.replaceVarsInExpressionString(hashmap, templateService).evaluate();
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

    @GetMapping("/sort/{attNo}")
    public List<Object> sort(@PathVariable String attNo){
        try{
//            System.out.println("Sorting objects of template " + template_name +"according to attribute "+attribute_name);
            return oservice.sortObjectsByAttribute(attNo);
        }
        catch(Exception e)
        {
            System.out.println("Got some exception");
            System.err.println(e);
            return null;
        }
    }


    @GetMapping("/evaluate/{templateName}/{expressionName}")
    public List<String> evaluateExpression(@PathVariable String expressionName, @PathVariable String templateName) {
    	Template template = templateService.findByTemplateName(templateName);
    	MDM_Expressions obj = template.findExpressionByName(expressionName);
    	String expString = obj.getExpressionString();
    	List<String> result = new ArrayList<>();
        System.out.println(template.getTemplate_name());
    	String[] words = expString.split("\\s+");
    	List<String> usedTemplates = new ArrayList<>();
    	List<List<Object>> objectList = new ArrayList<>();
    	for(String word : words) {
            System.out.println(word);
    		if (word.matches("[a-zA-Z\\.]+")) {
    			int dotIndex = word.indexOf('.');
    			String usedTemplate = word.substring(0, dotIndex);
                System.out.println(usedTemplate);
    			if(!usedTemplates.contains(usedTemplate)) {
    				usedTemplates.add(usedTemplate);
                    System.out.println("-------------------used template -------");
                    System.out.println("used template");
    				List<Object> objects = oservice.getAllObjectsForTemplate(usedTemplate);
                    System.out.println("====================================");

    				objectList.add(objects);   
    			}
    		}
    	}
    	for(int i = 0; i < objectList.get(0).size() ; i++) {
    		Map<String, Object> hashMap = new HashMap<>();
    		for(int j = 0; j < objectList.size(); j++) {
    			hashMap.put(usedTemplates.get(j),objectList.get(j).get(i));   		
    		}
    		result.add(obj.replaceVarsInExpressionString(hashMap, templateService).evaluate());
    	}
    	return result;
    }
}
