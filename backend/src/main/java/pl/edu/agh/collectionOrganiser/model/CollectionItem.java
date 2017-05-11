package pl.edu.agh.collectionOrganiser.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class CollectionItem {

    private String name;
    private boolean todo=false;
    private int rating=0;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isTodo() {
        return todo;
    }

    public void setTodo(boolean todo) {
        this.todo = todo;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
