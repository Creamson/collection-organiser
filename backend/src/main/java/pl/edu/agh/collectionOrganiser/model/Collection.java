package pl.edu.agh.collectionOrganiser.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@CompoundIndex(name="unique_collection_name_per_user", unique = true, def="{'ownerId' : 1, 'name' : 1}")
@Document(collection = "collections")
public class Collection {

    @Id
    private String id;
    private String ownerId;
    private String name;
    private List<CollectionItem> items;

    public Collection(){
        this.items = new ArrayList<>();
    }

    public Collection(String name){
        this.name = name;
        this.items = new ArrayList<>();
    }

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    public List<CollectionItem> getItems() {
        return items;
    }

    public void setItems(List<CollectionItem> items) {
        this.items = items;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void update(Collection updatedCollection) {
        this.name = updatedCollection.name;
    }
}
