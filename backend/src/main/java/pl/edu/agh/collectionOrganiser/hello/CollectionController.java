package pl.edu.agh.collectionOrganiser.hello;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.collectionOrganiser.model.Collection;
import pl.edu.agh.collectionOrganiser.mongoRepos.CollectionRepository;
import pl.edu.agh.collectionOrganiser.utils.TokenExtractor;

import javax.annotation.Resource;
import javax.naming.AuthenticationException;
import java.io.*;
import java.security.GeneralSecurityException;

import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
public class CollectionController {

    private final TokenExtractor tokenExtractor;

    @Resource
    private CollectionRepository collectionRepository;
    @Resource
    private GoogleIdTokenVerifier verifier;

    public CollectionController() throws IOException {
        this.tokenExtractor = new TokenExtractor();
    }

    @CrossOrigin
    @RequestMapping(method = POST, path = "/collections")
    public ResponseEntity createCollection(@RequestHeader(value = "Authorization") String authHeader,
                                           @RequestBody Collection toCreate) {
        try {
            GoogleIdToken idToken = verifyAndGetToken(authHeader);
            GoogleIdToken.Payload payload = idToken.getPayload();
            String userID = payload.getSubject();
            toCreate.setOwnerId(userID);
            this.collectionRepository.insert(toCreate);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (AuthenticationException | GeneralSecurityException | IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No valid authentication provided.");
        }

    }

    @CrossOrigin
    @RequestMapping(method = GET, path = "/collections/{collectionName}")
    public ResponseEntity getCollections(@RequestHeader(value = "Authorization") String authHeader,
                                         @PathVariable String collectionName) {
        try {
            GoogleIdToken idToken = verifyAndGetToken(authHeader);
            GoogleIdToken.Payload payload = idToken.getPayload();
            String userID = payload.getSubject();
            Collection requestedCollection = this.collectionRepository.findByOwnerIdAndName(userID, collectionName);
            System.out.println(userID + " " + collectionName);
            if (requestedCollection != null) {
                return ResponseEntity.status(HttpStatus.OK).body(requestedCollection);
            }

        } catch (AuthenticationException | GeneralSecurityException | IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No valid authentication provided.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @CrossOrigin
    @RequestMapping(method = PUT, path = "/collections/{collectionName}")
    public ResponseEntity updateCollection(@RequestHeader(value = "Authorization") String authHeader,
                                           @PathVariable String collectionName,
                                           @RequestBody Collection updatedCollection) {
        try {
            GoogleIdToken idToken = verifyAndGetToken(authHeader);
            GoogleIdToken.Payload payload = idToken.getPayload();
            String userID = payload.getSubject();
            Collection collectionToEdit = this.collectionRepository.findByOwnerIdAndName(userID, collectionName);
            if (collectionToEdit != null) {
                collectionToEdit.update(updatedCollection);
                this.collectionRepository.save(collectionToEdit);
                return ResponseEntity.status(HttpStatus.OK).build();
            }

        } catch (AuthenticationException | GeneralSecurityException | IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No valid authentication provided.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @CrossOrigin
    @RequestMapping(method = DELETE, path = "/collections/{collectionName}")
    public ResponseEntity deleteCollection(@RequestHeader(value = "Authorization") String authHeader,
                                           @PathVariable String collectionName) {
        try {
            GoogleIdToken idToken = verifyAndGetToken(authHeader);
            GoogleIdToken.Payload payload = idToken.getPayload();
            String userID = payload.getSubject();
            Collection collectionToDelete = this.collectionRepository.findByOwnerIdAndName(userID, collectionName);
            if (collectionToDelete != null) {
                this.collectionRepository.delete(collectionToDelete);
                return ResponseEntity.status(HttpStatus.OK).build();
            }

        } catch (AuthenticationException | GeneralSecurityException | IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No valid authentication provided.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
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