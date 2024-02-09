package com.example.Sample.SpringTest.repository;

import com.example.Sample.SpringTest.collection.Template;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface ObjectRepository extends MongoRepository<com.example.Sample.SpringTest.collection.Object, String> {

    @Query(value = "{'object_name' : ?0}")
    Template findByObjectName(String objName);
}
