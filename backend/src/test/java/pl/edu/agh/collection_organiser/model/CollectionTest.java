package pl.edu.agh.collection_organiser.model;

import org.junit.Test;
import org.springframework.dao.DuplicateKeyException;

import static org.junit.Assert.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class CollectionTest {

    @Test
    public void update() {
        Collection movies = new Collection("Movies");
        Collection books = new Collection("Books");

        movies.update(books);

        assertEquals("Books", movies.getName());
    }

    @Test
    public void addNonExistentItem() {
        Collection movies = new Collection("Movies");
        CollectionItem existentItem = mock(CollectionItem.class);
        CollectionItem newItem = mock(CollectionItem.class);
        when(existentItem.getName()).thenReturn("LotR");
        when(newItem.getName()).thenReturn("Harry Potter");

        movies.addItem(existentItem);
        movies.addItem(newItem);
    }

    @Test(expected = DuplicateKeyException.class)
    public void addExistingItem() {
        Collection movies = new Collection("Movies");
        CollectionItem existentItem = mock(CollectionItem.class);
        CollectionItem newItem = mock(CollectionItem.class);
        when(existentItem.getName()).thenReturn("LotR");
        when(newItem.getName()).thenReturn("LotR");

        movies.addItem(existentItem);
        movies.addItem(newItem);
    }

    @Test
    public void removeNonExistentItem() {
        Collection movies = new Collection("Movies");
        CollectionItem existentItem = mock(CollectionItem.class);
        when(existentItem.getName()).thenReturn("HarryPotter");
        movies.addItem(existentItem);

        movies.remove("Harry Potter");

        assertEquals(1, movies.getItems().size());
    }

    @Test
    public void removeExistingItem() {
        Collection movies = new Collection("Movies");
        CollectionItem existentItem = mock(CollectionItem.class);
        when(existentItem.getName()).thenReturn("LotR");
        movies.addItem(existentItem);

        movies.remove("LotR");

        assertEquals(0, movies.getItems().size());
    }

    @Test
    public void getItemWhenDoesNotContain() {
        Collection movies = new Collection("Movies");
        CollectionItem item = mock(CollectionItem.class);
        when(item.getName()).thenReturn("Harry Potter");
        movies.addItem(item);

        assertEquals(false, movies.getItemByName("LotR").isPresent());
    }

    @Test
    public void getItemWhenContains() {
        Collection movies = new Collection("Movies");
        CollectionItem desiredItem = mock(CollectionItem.class);
        CollectionItem anotherItem = mock(CollectionItem.class);
        when(desiredItem.getName()).thenReturn("LotR");
        when(anotherItem.getName()).thenReturn("Harry Potter");
        movies.addItem(anotherItem);
        movies.addItem(desiredItem);

        assertEquals(true, movies.getItemByName("LotR").isPresent());
    }

}