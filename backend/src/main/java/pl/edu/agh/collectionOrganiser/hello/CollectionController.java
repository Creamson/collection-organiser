package pl.edu.agh.collectionOrganiser.hello;

import com.fasterxml.jackson.annotation.JsonView;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.collectionOrganiser.config.View;
import pl.edu.agh.collectionOrganiser.model.Collection;
import pl.edu.agh.collectionOrganiser.model.CollectionItem;
import pl.edu.agh.collectionOrganiser.mongoRepos.CollectionRepository;
import pl.edu.agh.collectionOrganiser.utils.TokenExtractor;

import javax.annotation.Resource;
import javax.naming.AuthenticationException;
import java.io.*;
import java.security.GeneralSecurityException;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
public class CollectionController {

    @Resource
    private TokenExtractor tokenExtractor;
    @Resource
    private CollectionRepository collectionRepository;
    @Resource
    private GoogleIdTokenVerifier verifier;

    @CrossOrigin
    @RequestMapping(method = POST, path = "/collections")
    public ResponseEntity createCollection(@RequestHeader(value = "Authorization") String authHeader,
                                           @RequestBody Collection toCreate) {

        return verifyTokenAndGetResponse(authHeader, (String userID) -> {
            toCreate.setOwnerId(userID);
            try {
                this.collectionRepository.insert(toCreate);
            } catch (DuplicateKeyException e) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Collection already exists.");
            }
            return ResponseEntity.status(HttpStatus.CREATED).build();
        });
    }

    @JsonView(View.GeneralData.class)
    @CrossOrigin
    @RequestMapping(method = GET, path = "/collections")
    public ResponseEntity getCollections(@RequestHeader(value = "Authorization") String authHeader) {

        return verifyTokenAndGetResponse(authHeader, (String userID) -> {
            List<Collection> collections = this.collectionRepository.findAllByOwnerId(userID);

            return ResponseEntity.status(HttpStatus.OK).body(collections);
        });
    }

    @JsonView(View.DetailedData.class)
    @CrossOrigin
    @RequestMapping(method = GET, path = "/collections/{collectionName}")
    public ResponseEntity getCollection(@RequestHeader(value = "Authorization") String authHeader,
                                        @PathVariable String collectionName) {

        return verifyTokenAndGetResponse(authHeader, (String userID) -> {
            Collection requestedCollection = this.collectionRepository.findByOwnerIdAndName(userID, collectionName);
            if (requestedCollection != null) {
                return ResponseEntity.status(HttpStatus.OK).body(requestedCollection);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Collection not found");
        });
    }

    @CrossOrigin
    @RequestMapping(method = PUT, path = "/collections/{collectionName}")
    public ResponseEntity updateCollection(@RequestHeader(value = "Authorization") String authHeader,
                                           @PathVariable String collectionName,
                                           @RequestBody Collection updatedCollection) {

        return verifyTokenAndGetResponse(authHeader, (String userID) -> {
            Collection collectionToEdit = this.collectionRepository.findByOwnerIdAndName(userID, collectionName);
            if (collectionToEdit != null) {
                collectionToEdit.update(updatedCollection);
                this.collectionRepository.save(collectionToEdit);
                return ResponseEntity.status(HttpStatus.OK).build();
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Collection not found");
        });
    }


    @CrossOrigin
    @RequestMapping(method = DELETE, path = "/collections/{collectionName}")
    public ResponseEntity deleteCollection(@RequestHeader(value = "Authorization") String authHeader,
                                           @PathVariable String collectionName) {

        return verifyTokenAndGetResponse(authHeader, (String userID) -> {
            Collection collectionToDelete = this.collectionRepository.findByOwnerIdAndName(userID, collectionName);
            if (collectionToDelete != null) {
                this.collectionRepository.delete(collectionToDelete);
                return ResponseEntity.status(HttpStatus.OK).build();
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Collection not found");
        });
    }

    @CrossOrigin
    @RequestMapping(method = POST, path = "collections/{collectionName}")
    public ResponseEntity createItem(@RequestHeader(value = "Authorization") String authHeader,
                                     @PathVariable String collectionName,
                                     @RequestBody CollectionItem item) {

        return verifyTokenAndGetResponse(authHeader, (String userID) -> {
            Collection collection = this.collectionRepository.findByOwnerIdAndName(userID, collectionName);
            if (collection != null) {
                try {
                    collection.addItem(item);
                    this.collectionRepository.save(collection);
                    return ResponseEntity.status(HttpStatus.CREATED).build();
                } catch (DuplicateKeyException e) {
                    return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
                }
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Collection not found");
        });
    }

    @CrossOrigin
    @RequestMapping(method = PUT, path = "collections/{collectionName}/{itemName}")
    public ResponseEntity updateItem(@RequestHeader(value = "Authorization") String authHeader,
                                     @PathVariable String collectionName,
                                     @PathVariable String itemName,
                                     @RequestBody CollectionItem item) {
        return verifyTokenAndGetResponse(authHeader, (String userID) -> {
            Collection collection = this.collectionRepository.findByOwnerIdAndName(userID, collectionName);
            if (collection != null) {
                Optional<CollectionItem> toUpdate = collection.getItemByName(itemName);
                toUpdate.ifPresent(i -> i.update(item));

                this.collectionRepository.save(collection);
                return ResponseEntity.status(HttpStatus.OK).build();
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Collection not found");
        });
    }

    @CrossOrigin
    @RequestMapping(method = DELETE, path = "collections/{collectionName}/{itemName}")
    public ResponseEntity deleteItem(@RequestHeader(value = "Authorization") String authHeader,
                                     @PathVariable String collectionName,
                                     @PathVariable String itemName) {

        return verifyTokenAndGetResponse(authHeader, (String userID) -> {
            Collection collection = this.collectionRepository.findByOwnerIdAndName(userID, collectionName);
            if (collection != null) {
                collection.remove(itemName);
                this.collectionRepository.save(collection);
                return ResponseEntity.status(HttpStatus.OK).build();
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Collection not found");
        });
    }

    private ResponseEntity verifyTokenAndGetResponse(String authHeader, Function<String, ResponseEntity> toExecute) {
        try {
            GoogleIdToken idToken = verifyAndGetToken(authHeader);
            GoogleIdToken.Payload payload = idToken.getPayload();
            String userID = payload.getSubject();
            return toExecute.apply(userID);

        } catch (AuthenticationException | GeneralSecurityException | IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No valid authentication provided.");
        }
    }

    private GoogleIdToken verifyAndGetToken(String authHeader) throws AuthenticationException, GeneralSecurityException, IOException {
        String idTokenString = this.tokenExtractor.extractToken(authHeader);
        GoogleIdToken idToken = verifier.verify(idTokenString);

        if (idToken == null) {
            throw new AuthenticationException();
        }
        return idToken;
    }

}