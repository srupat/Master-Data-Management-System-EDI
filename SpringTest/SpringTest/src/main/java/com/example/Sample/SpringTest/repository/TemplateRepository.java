package com.example.Sample.SpringTest.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.Sample.SpringTest.collection.Template;

@Repository
public interface TemplateRepository extends MongoRepository<Template, String>{

	@Query(value = "{'template_name' : ?0}")
	Template findByTemplateName(String templateName);
}
