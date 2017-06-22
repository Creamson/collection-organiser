package pl.edu.agh.collection_organiser.services;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InOrder;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.dao.DuplicateKeyException;
import pl.edu.agh.collection_organiser.exceptions.NotFoundException;
import pl.edu.agh.collection_organiser.model.Collection;
import pl.edu.agh.collection_organiser.model.CollectionItem;
import pl.edu.agh.collection_organiser.mongo_repos.CollectionRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class CollectionServiceTest {

    @InjectMocks
    private CollectionService collectionService;

    @Mock
    private CollectionRepository repository;

    @Test
    public void createCollectionNoDuplicate() {
        Collection collection = mock(Collection.class);
        when(repository.insert(collection)).thenReturn(collection);
        collectionService.createCollection(collection);
        verify(repository).insert(collection);
    }

    @Test(expected = DuplicateKeyException.class)
    public void createCollectionDuplicate() {
        Collection collection = mock(Collection.class);
        when(repository.insert(collection)).thenThrow(new DuplicateKeyException("Already exists"));
        collectionService.createCollection(collection);

    }

    @Test
    public void getCollections() {
        Collection collection1 = mock(Collection.class);
        Collection collection2 = mock(Collection.class);
        List<Collection> collections = Arrays.asList(collection1, collection2);
        when(repository.findAllByOwnerId("1")).thenReturn(collections);
        List<Collection> returned = collectionService.getCollections("1");
        verify(repository).findAllByOwnerId("1");
        assertArrayEquals(collections.toArray(), returned.toArray());
    }

    @Test
    public void getExistingCollection() {
        Collection collection = mock(Collection.class);
        when(repository.findByOwnerIdAndName("1", "Movies")).thenReturn(collection);
        Collection result = collectionService.getCollection("1", "Movies");
        verify(repository).findByOwnerIdAndName("1", "Movies");

        assertEquals(collection, result);
    }

    @Test(expected = NotFoundException.class)
    public void getNonExistentCollection() {
        when(repository.findByOwnerIdAndName("1", "Movies")).thenReturn(null);
        collectionService.getCollection("1", "Movies");
    }

    @Test
    public void updateExistingCollection() {
        Collection collection = mock(Collection.class);
        Collection updated = mock(Collection.class);
        when(repository.findByOwnerIdAndName("1", "Movies")).thenReturn(collection);

        collectionService.updateCollection("1", "Movies", updated);

        InOrder order = Mockito.inOrder(collection, repository);
        order.verify(collection).update(updated);
        order.verify(repository).save(collection);
    }

    @Test(expected = NotFoundException.class)
    public void updateNonExistentCollection() {
        Collection updated = mock(Collection.class);
        when(repository.findByOwnerIdAndName("1", "Movies")).thenReturn(null);
        collectionService.updateCollection("1", "Movies", updated);
    }

    @Test(expected = DuplicateKeyException.class)
    public void updateExistingCollectionDuplicate() {
        Collection collection = mock(Collection.class);
        Collection updated = mock(Collection.class);
        when(repository.findByOwnerIdAndName("1", "Movies")).thenReturn(collection);
        when(repository.save(collection)).thenThrow(new DuplicateKeyException(""));
        collectionService.updateCollection("1", "Movies", updated);
    }

    @Test
    public void deleteExistingCollection() {
        Collection collection = mock(Collection.class);
        when(repository.findByOwnerIdAndName("1", "Movies")).thenReturn(collection);
        collectionService.deleteCollection("1", "Movies");

        verify(repository).delete(collection);
    }

    @Test(expected = NotFoundException.class)
    public void deleteNonExistentCollection() {
        when(repository.findByOwnerIdAndName("1", "Movies")).thenReturn(null);
        collectionService.deleteCollection("1", "Movies");
    }

    @Test(expected = NotFoundException.class)
    public void getItemFromNonExistentCollection() {
        when(repository.findByOwnerIdAndName("1", "Movies")).thenReturn(null);
        collectionService.getItem("1", "Movies", "LotR");
    }

    @Test(expected = NotFoundException.class)
    public void getNonExistentItem() {
        Collection collection = mock(Collection.class);
        when(repository.findByOwnerIdAndName("1", "Movies")).thenReturn(collection);
        when(collection.getItemByName("LotR")).thenReturn(Optional.empty());
        collectionService.getItem("1", "Movies", "LotR");
    }

    @Test
    public void getExistingItem() {
        Collection collection = mock(Collection.class);
        CollectionItem item = mock(CollectionItem.class);
        when(repository.findByOwnerIdAndName("1", "Movies")).thenReturn(collection);
        when(collection.getItemByName("LotR")).thenReturn(Optional.of(item));
        CollectionItem result = collectionService.getItem("1", "Movies", "LotR");

        assertEquals(item, result);
    }

    @Test(expected = NotFoundException.class)
    public void createItemInNonExistentCollection(){
        CollectionItem item = mock(CollectionItem.class);
        when(repository.findByOwnerIdAndName("1", "Movies")).thenReturn(null);
        collectionService.createItem("1", "Movies", item);
    }

    @Test(expected = DuplicateKeyException.class)
    public void createItemWithDuplicateName() {
        Collection collection = mock(Collection.class);
        CollectionItem item = mock(CollectionItem.class);
        when(repository.findByOwnerIdAndName("1", "Movies")).thenReturn(collection);
        doThrow(new DuplicateKeyException("")).when(collection).addItem(item);

        collectionService.createItem("1", "Movies", item);
    }

    @Test
    public void createItemSuccessfully() {
        Collection collection = mock(Collection.class);
        CollectionItem item = mock(CollectionItem.class);
        when(repository.findByOwnerIdAndName("1", "Movies")).thenReturn(collection);

        collectionService.createItem("1", "Movies", item);

        InOrder order = Mockito.inOrder(collection, repository);
        order.verify(collection).addItem(item);
        order.verify(repository).save(collection);
    }

    @Test(expected = NotFoundException.class)
    public void updateItemInNonExistentCollection(){
        CollectionItem item = mock(CollectionItem.class);
        when(repository.findByOwnerIdAndName("1", "Movies")).thenReturn(null);
        collectionService.updateItem("1", "Movies", "LotR", item);
    }

    @Test(expected = NotFoundException.class)
    public void updateNonExistentItem(){
        Collection collection = mock(Collection.class);
        CollectionItem updated = mock(CollectionItem.class);
        when(repository.findByOwnerIdAndName("1", "Movies")).thenReturn(collection);
        when(collection.getItemByName("LotR")).thenReturn(Optional.empty());
        collectionService.updateItem("1", "Movies", "LotR", updated);
    }

    @Test(expected = DuplicateKeyException.class)
    public void updateItemWithDuplicateName() {
        Collection collection = mock(Collection.class);
        CollectionItem updated = mock(CollectionItem.class);
        CollectionItem itemToChange = mock(CollectionItem.class);
        CollectionItem existentItemWithRequestedName = mock(CollectionItem.class);

        when(repository.findByOwnerIdAndName("1", "Movies")).thenReturn(collection);
        when(collection.getItemByName("LotR")).thenReturn(Optional.of(existentItemWithRequestedName));
        when(collection.getItemByName("Harry Potter")).thenReturn(Optional.of(itemToChange));
        when(updated.getName()).thenReturn("LotR");
        when(itemToChange.getName()).thenReturn("Harry Potter");
        when(existentItemWithRequestedName.getName()).thenReturn("LotR");

        collectionService.updateItem("1", "Movies", "Harry Potter", updated);
    }

    @Test
    public void updateExistentItemWithoutChangingName() {
        Collection collection = mock(Collection.class);
        CollectionItem updated = mock(CollectionItem.class);
        CollectionItem duplicateItem = mock(CollectionItem.class);

        when(repository.findByOwnerIdAndName("1", "Movies")).thenReturn(collection);
        when(collection.getItemByName("LotR")).thenReturn(Optional.of(duplicateItem));
        when(updated.getName()).thenReturn("LotR");
        when(duplicateItem.getName()).thenReturn("LotR");

        collectionService.updateItem("1", "Movies", "LotR", updated);

        InOrder order = Mockito.inOrder(duplicateItem, repository);
        order.verify(duplicateItem).update(updated);
        order.verify(repository).save(collection);
    }

    @Test
    public void updateItemNoDuplicate() {
        Collection collection = mock(Collection.class);
        CollectionItem updated = mock(CollectionItem.class);
        CollectionItem existentItem = mock(CollectionItem.class);

        when(repository.findByOwnerIdAndName("1", "Movies")).thenReturn(collection);
        when(updated.getName()).thenReturn("LotR");
        when(collection.getItemByName("LotR")).thenReturn(Optional.empty());
        when(collection.getItemByName("Harry Potter")).thenReturn(Optional.of(existentItem));
        when(existentItem.getName()).thenReturn("Alice");

        collectionService.updateItem("1", "Movies", "Harry Potter", updated);

        InOrder order = Mockito.inOrder(existentItem, repository);
        order.verify(existentItem).update(updated);
        order.verify(repository).save(collection);
    }

    @Test(expected = NotFoundException.class)
    public void deleteItemFromNonExistentCollection() {
        when(repository.findByOwnerIdAndName("1", "Movies")).thenReturn(null);
        collectionService.deleteItem("1", "Movies", "LotR");
    }

    @Test
    public void deleteNonExistentItem() {
        Collection collection = mock(Collection.class);
        when(repository.findByOwnerIdAndName("1", "Movies")).thenReturn(collection);
        when(collection.getItemByName("LotR")).thenReturn(Optional.empty());
        collectionService.deleteItem("1", "Movies", "LotR");

        InOrder order = Mockito.inOrder(collection, repository);
        order.verify(collection).remove("LotR");
        order.verify(repository).save(collection);

    }

    @Test
    public void deleteExistingItem() {
        Collection collection = mock(Collection.class);
        CollectionItem item = mock(CollectionItem.class);
        when(repository.findByOwnerIdAndName("1", "Movies")).thenReturn(collection);
        when(collection.getItemByName("LotR")).thenReturn(Optional.of(item));
        collectionService.deleteItem("1", "Movies", "LotR");

        InOrder order = Mockito.inOrder(collection, repository);
        order.verify(collection).remove("LotR");
        order.verify(repository).save(collection);
    }
}