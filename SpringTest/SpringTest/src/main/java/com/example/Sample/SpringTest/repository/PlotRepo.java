package com.example.Sample.SpringTest.repository;

import com.example.Sample.SpringTest.collection.Plot;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PlotRepo extends MongoRepository<Plot,String> {

}
