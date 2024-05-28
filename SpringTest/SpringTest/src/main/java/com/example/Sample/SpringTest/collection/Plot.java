package com.example.Sample.SpringTest.collection;

import org.apache.catalina.LifecycleState;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "test_graph2")
public class Plot {
     public List<String> timestamp;
     public List<String> inputPower;
     public List<String>  outputPower;
     public List<Plot> plots;

    public Plot() {
        this.plots = new ArrayList<>();
        this.timestamp = new ArrayList<>();
        this.inputPower = new ArrayList<>();
        this.outputPower = new ArrayList<>();
    }
}
