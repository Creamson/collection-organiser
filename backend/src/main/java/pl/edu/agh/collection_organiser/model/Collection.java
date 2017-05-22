package pl.edu.agh.collection_organiser.model;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.edu.agh.collection_organiser.config.View;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@CompoundIndex(name = "unique_collection_name_per_user", unique = true, def = "{'ownerId' : 1, 'name' : 1}")
@Document(collection = "collections")
public class Collection {

    @Id
    private String id;
    private String ownerId;
    private String name;
    private List<CollectionItem> items;

    public Collection() {
        this.items = new ArrayList<>();
    }

    public Collection(String name) {
        this.name = name;
        this.items = new ArrayList<>();
    }

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    @JsonView(View.DetailedData.class)
    public List<CollectionItem> getItems() {
        return items;
    }

    public void setItems(List<CollectionItem> items) {
        this.items = items;
    }

    @JsonView({View.GeneralData.class, View.DetailedData.class})
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

    public void addItem(CollectionItem item) {
        if (!containsItem(item)) {
            this.getItems().add(item);
        } else {
            throw new DuplicateKeyException("Item " + item.getName() + " already exists in this collection.");
        }
    }

    private boolean containsItem(CollectionItem item) {
        Set<String> itemNames = this.getItems()
                .stream()
                .map(CollectionItem::getName)
                .collect(Collectors.toSet());
        return itemNames.contains(item.getName());
    }

    public Optional<CollectionItem> getItemByName(String name) {
        return this.getItems().stream().filter(e -> e.getName().equals(name)).findFirst();
    }

    public void remove(String name) {
        Optional<CollectionItem> item = this.getItemByName(name);
        item.ifPresent(i -> this.getItems().remove(i));
    }

}
