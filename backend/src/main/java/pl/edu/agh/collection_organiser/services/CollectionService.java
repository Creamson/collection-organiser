package pl.edu.agh.collection_organiser.services;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import pl.edu.agh.collection_organiser.exceptions.NotFoundException;
import pl.edu.agh.collection_organiser.model.Collection;
import pl.edu.agh.collection_organiser.model.CollectionItem;
import pl.edu.agh.collection_organiser.mongo_repos.CollectionRepository;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

@Service
public class CollectionService {

    @Resource
    private CollectionRepository collectionRepository;

    public void createCollection(Collection toCreate) {
        this.collectionRepository.insert(toCreate);
    }

    public List<Collection> getCollections(String userId){
        return this.collectionRepository.findAllByOwnerId(userId);
    }

    public Collection getCollection(String userId, String collectionName) {
        Collection requestedCollection = this.collectionRepository.findByOwnerIdAndName(userId, collectionName);
        if (requestedCollection != null) {
            return requestedCollection;
        }
        throw new NotFoundException("Collection not found");
    }

    public void updateCollection(String userId, String collectionName,
                                 Collection updatedCollection) {
        Collection collectionToEdit = this.collectionRepository.findByOwnerIdAndName(userId, collectionName);
        if (collectionToEdit != null) {
            collectionToEdit.update(updatedCollection);
            this.collectionRepository.save(collectionToEdit);
            return;
        }
        throw new NotFoundException("Collection not found");
    }

    public void deleteCollection(String userId, String collectionName) {
        Collection collectionToDelete = this.collectionRepository.findByOwnerIdAndName(userId, collectionName);
        if (collectionToDelete != null) {
            this.collectionRepository.delete(collectionToDelete);
            return;
        }
        throw new NotFoundException("Collection not found");
    }

    public CollectionItem getItem(String userId, String collectionName, String itemName) {
        Collection requestedCollection = this.collectionRepository.findByOwnerIdAndName(userId, collectionName);
        if (requestedCollection != null) {
            Optional<CollectionItem> requestedItem = requestedCollection.getItemByName(itemName);
            if (requestedItem.isPresent()) {
                return requestedItem.get();
            }
            throw new NotFoundException("Item not found");
        }
        throw new NotFoundException("Collection not found");
    }

    public void createItem(String userId, String collectionName, CollectionItem item) {
        Collection collection = this.collectionRepository.findByOwnerIdAndName(userId, collectionName);
        if (collection != null) {
            collection.addItem(item);
            this.collectionRepository.save(collection);
            return;
        }
        throw new NotFoundException("Collection not found");
    }

    public void updateItem(String userId, String collectionName, String itemName, CollectionItem item) {
        Collection collection = this.collectionRepository.findByOwnerIdAndName(userId, collectionName);
        if (collection != null) {
            Optional<CollectionItem> toUpdate = collection.getItemByName(itemName);
            if(toUpdate.isPresent()) {
                Optional<CollectionItem> duplicate = collection.getItemByName(item.getName());
                if (!duplicate.isPresent() || duplicate.get().equals(toUpdate.get())) {
                    toUpdate.get().update(item);

                    this.collectionRepository.save(collection);
                    return;
                }
                throw new DuplicateKeyException("Item already exists");
            }
            throw new NotFoundException("Item not found");
        }
        throw new NotFoundException("Collection not found");
    }

    public void deleteItem(String userId, String collectionName, String itemName) {
        Collection collection = this.collectionRepository.findByOwnerIdAndName(userId, collectionName);
        if (collection != null) {
            collection.remove(itemName);
            this.collectionRepository.save(collection);
            return;
        }
        throw new NotFoundException("Collection not found");
    }
}
