package com.example.Sample.SpringTest.repository;

import com.example.Sample.SpringTest.collection.Object;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ObjectRepository extends MongoRepository<com.example.Sample.SpringTest.collection.Object, String> {

    @Query(value = "{'obj_name' : ?0}")
    Object findByObjectName(String objName);
    
    
}
