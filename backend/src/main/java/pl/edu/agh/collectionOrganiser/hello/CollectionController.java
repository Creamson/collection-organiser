package pl.edu.agh.collectionOrganiser.hello;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.mongodb.MongoClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.collectionOrganiser.utils.TokenExtractor;

import javax.annotation.Resource;
import javax.naming.AuthenticationException;
import java.io.*;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.concurrent.atomic.AtomicLong;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
public class CollectionController {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();
    private final TokenExtractor tokenExtractor;
    private String CLIENT_ID;

    @Resource
    MongoClient mongoClient;
    private GoogleIdTokenVerifier verifier;

    public CollectionController() throws IOException {
        this.tokenExtractor = new TokenExtractor();
        setupTokenVerifier();
    }

    @CrossOrigin
    @RequestMapping(method=GET, path = "/greeting")
    public ResponseEntity greeting(@RequestHeader(value="Authorization") String authHeader) {
        try {
            GoogleIdToken idToken = verifyAndGetToken(authHeader);
            GoogleIdToken.Payload payload = idToken.getPayload();
            String name = (String) payload.get("name");

            return ResponseEntity.ok().body(new Greeting(counter.incrementAndGet(),
                    String.format(template, name)));
        } catch (AuthenticationException | GeneralSecurityException | IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No valid authentication provided.");
        }
    }

    private GoogleIdToken verifyAndGetToken(String authHeader) throws AuthenticationException, GeneralSecurityException, IOException {
        String idTokenString = this.tokenExtractor.extractToken(authHeader);
        GoogleIdToken idToken = verifier.verify(idTokenString);

        if(idToken == null){
            throw new AuthenticationException();
        }
        return idToken;
    }

    private void setupTokenVerifier() throws IOException {
        fetchClientID();
        this.verifier = new GoogleIdTokenVerifier
                .Builder(new NetHttpTransport(), new JacksonFactory())
                .setAudience(Collections.singletonList(this.CLIENT_ID))
                .build();
    }

    private void fetchClientID() throws IOException {
        ClassLoader classLoader = getClass().getClassLoader();
        File file = new File(classLoader.getResource("client-info").getFile());
        this.CLIENT_ID = new BufferedReader(new InputStreamReader(new FileInputStream(file))).readLine();
    }
}