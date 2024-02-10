package ObjectMapper;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JSON_Parsor {
	
	public static ObjectMapper objectMapper = getDefaultObjectMapper();
	
	private static ObjectMapper getDefaultObjectMapper() {
		
		ObjectMapper defaultObjectMapper = new ObjectMapper();
		defaultObjectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		return defaultObjectMapper;
	}
	
	public static JsonNode parse(String json) throws JsonMappingException, JsonProcessingException {
		return objectMapper.readTree(json);	
	}
	
	public static <A> A fromJson(JsonNode jNode, Class<A> classArg) throws JsonProcessingException, IllegalArgumentException {
		return objectMapper.treeToValue(jNode, classArg);
	}
	
	public static String toJson(Object obj) throws JsonProcessingException, IllegalArgumentException {
		return objectMapper.writeValueAsString(objectMapper.valueToTree(obj));
	}		
}
