package pl.edu.agh.collection_organiser.mongo_repos;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.edu.agh.collection_organiser.model.Collection;

import java.util.List;

public interface CollectionRepository extends MongoRepository<Collection, String> {

    Collection findByOwnerIdAndName(String ownerId, String name);
    List<Collection> findAllByOwnerId(String ownerId);
}
