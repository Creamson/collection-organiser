package pl.edu.agh.collection_organiser.model;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.edu.agh.collection_organiser.config.View;

@Document
public class CollectionItem {

    private String name;
    private boolean todo;
    private int rating;

    @JsonView(View.DetailedData.class)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @JsonView(View.DetailedData.class)
    public boolean isTodo() {
        return todo;
    }

    public void setTodo(boolean todo) {
        this.todo = todo;
    }

    @JsonView(View.DetailedData.class)
    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public void update(CollectionItem item) {
        this.setName(item.getName());
        this.setRating(item.getRating());
        this.setTodo(item.isTodo());
    }
}
