package pl.edu.agh.collectionOrganiser.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class CollectionItem {

    private String name;
    private boolean todo=false;
    private int rating=0;


}
