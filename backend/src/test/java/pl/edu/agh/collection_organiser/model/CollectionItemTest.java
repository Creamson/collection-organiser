package pl.edu.agh.collection_organiser.model;

import org.junit.Test;

import static org.junit.Assert.*;

public class CollectionItemTest {

    @Test
    public void update() {
        CollectionItem lotr = new CollectionItem();
        CollectionItem hp = new CollectionItem();
        lotr.setName("LotR");
        lotr.setRating(10);
        lotr.setTodo(false);
        hp.setName("Harry Potter");
        hp.setRating(8);
        hp.setTodo(true);

        lotr.update(hp);
        assertTrue(lotr.isTodo());
        assertEquals(8, lotr.getRating());
        assertEquals("Harry Potter", lotr.getName());

    }

    @Test
    public void areDefaultsCorrect(){
        CollectionItem lotr = new CollectionItem();
        assertFalse(lotr.isTodo());
        assertEquals(0, lotr.getRating());
    }
}