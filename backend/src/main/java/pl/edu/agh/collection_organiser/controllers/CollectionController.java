package pl.edu.agh.collection_organiser.controllers;

import com.fasterxml.jackson.annotation.JsonView;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import org.apache.http.auth.AuthenticationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.collection_organiser.config.View;
import pl.edu.agh.collection_organiser.exceptions.NotFoundException;
import pl.edu.agh.collection_organiser.model.Collection;
import pl.edu.agh.collection_organiser.model.CollectionItem;
import pl.edu.agh.collection_organiser.mongo_repos.CollectionRepository;
import pl.edu.agh.collection_organiser.services.CollectionService;
import pl.edu.agh.collection_organiser.utils.TokenExtractor;

import javax.annotation.Resource;
import java.io.*;
import java.security.GeneralSecurityException;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
public class CollectionController {

    @Resource
    CollectionService collectionService;
    @Resource
    private TokenExtractor tokenExtractor;
    @Resource
    private GoogleIdTokenVerifier verifier;

    @CrossOrigin
    @RequestMapping(method = POST, path = "/collections")
    public ResponseEntity createCollection(@RequestHeader(value = "Authorization") String authHeader,
                                           @RequestBody Collection toCreate) {

        return verifyTokenAndGetResponse(authHeader, (String userId) -> {
            toCreate.setOwnerId(userId);
            try {
                this.collectionService.createCollection(toCreate);
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

        return verifyTokenAndGetResponse(authHeader, (String userId) -> {
            List<Collection> collections = this.collectionService.getCollections(userId);
            return ResponseEntity.status(HttpStatus.OK).body(collections);
        });
    }

    @JsonView(View.DetailedData.class)
    @CrossOrigin
    @RequestMapping(method = GET, path = "/collections/{collectionName}")
    public ResponseEntity getCollection(@RequestHeader(value = "Authorization") String authHeader,
                                        @PathVariable String collectionName) {

        return verifyTokenAndGetResponse(authHeader, (String userId) -> {
            try {
                Collection requestedCollection = this.collectionService.getCollection(userId, collectionName);
                return ResponseEntity.status(HttpStatus.OK).body(requestedCollection);
            } catch (NotFoundException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            }
        });
    }

    @CrossOrigin
    @RequestMapping(method = PUT, path = "/collections/{collectionName}")
    public ResponseEntity updateCollection(@RequestHeader(value = "Authorization") String authHeader,
                                           @PathVariable String collectionName,
                                           @RequestBody Collection updatedCollection) {

        return verifyTokenAndGetResponse(authHeader, (String userId) -> {
            try {
                this.collectionService.updateCollection(userId, collectionName, updatedCollection);
            } catch (NotFoundException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            } catch (DuplicateKeyException e) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
            }
            return ResponseEntity.status(HttpStatus.OK).build();
        });
    }


    @CrossOrigin
    @RequestMapping(method = DELETE, path = "/collections/{collectionName}")
    public ResponseEntity deleteCollection(@RequestHeader(value = "Authorization") String authHeader,
                                           @PathVariable String collectionName) {

        return verifyTokenAndGetResponse(authHeader, (String userId) -> {
            try {
                this.collectionService.deleteCollection(userId, collectionName);
            } catch (NotFoundException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            }
            return ResponseEntity.status(HttpStatus.OK).build();
        });
    }

    @JsonView(View.DetailedData.class)
    @CrossOrigin
    @RequestMapping(method = GET, path = "/collections/{collectionName}/{itemName}")
    public ResponseEntity getItem(@RequestHeader(value = "Authorization") String authHeader,
                                  @PathVariable String collectionName,
                                  @PathVariable String itemName) {

        return verifyTokenAndGetResponse(authHeader, (String userId) -> {
            try {
                CollectionItem requestedItem = this.collectionService.getItem(userId, collectionName, itemName);
                return ResponseEntity.status(HttpStatus.OK).body(requestedItem);
            } catch (NotFoundException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            }

        });
    }

    @CrossOrigin
    @RequestMapping(method = POST, path = "collections/{collectionName}")
    public ResponseEntity createItem(@RequestHeader(value = "Authorization") String authHeader,
                                     @PathVariable String collectionName,
                                     @RequestBody CollectionItem item) {

        return verifyTokenAndGetResponse(authHeader, (String userId) -> {
            try {
                this.collectionService.createItem(userId, collectionName, item);
            } catch (NotFoundException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            } catch (DuplicateKeyException e) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
            }
            return ResponseEntity.status(HttpStatus.CREATED).build();
        });
    }

    @CrossOrigin
    @RequestMapping(method = PUT, path = "collections/{collectionName}/{itemName}")
    public ResponseEntity updateItem(@RequestHeader(value = "Authorization") String authHeader,
                                     @PathVariable String collectionName,
                                     @PathVariable String itemName,
                                     @RequestBody CollectionItem item) {
        return verifyTokenAndGetResponse(authHeader, (String userId) -> {
            try {
                this.collectionService.updateItem(userId, collectionName, itemName, item);
            } catch (NotFoundException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            } catch (DuplicateKeyException e) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
            }
            return ResponseEntity.status(HttpStatus.OK).build();
        });
    }

    @CrossOrigin
    @RequestMapping(method = DELETE, path = "collections/{collectionName}/{itemName}")
    public ResponseEntity deleteItem(@RequestHeader(value = "Authorization") String authHeader,
                                     @PathVariable String collectionName,
                                     @PathVariable String itemName) {

        return verifyTokenAndGetResponse(authHeader, (String userID) -> {
            try {
                this.collectionService.deleteItem(userID, collectionName, itemName);
            } catch (NotFoundException e) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
            }
            return ResponseEntity.status(HttpStatus.OK).build();
        });
    }

    private ResponseEntity verifyTokenAndGetResponse(String authHeader, Function<String, ResponseEntity> toExecute) {
        try {
            GoogleIdToken idToken = verifyAndGetToken(authHeader);
            GoogleIdToken.Payload payload = idToken.getPayload();
            String userID = payload.getSubject();
            return toExecute.apply(userID);

        } catch (AuthenticationException | GeneralSecurityException | IOException e) {
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