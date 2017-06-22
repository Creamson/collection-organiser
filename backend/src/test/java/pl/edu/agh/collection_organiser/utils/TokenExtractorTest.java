package pl.edu.agh.collection_organiser.utils;

import org.apache.http.auth.AuthenticationException;
import org.junit.Test;

public class TokenExtractorTest {

    private TokenExtractor extractor = new TokenExtractor();

    @Test(expected = AuthenticationException.class)
    public void noBearerShouldThrowException() throws AuthenticationException {
        String header = "asd123.sda2.123rase2";
        extractor.extractToken(header);
    }

    @Test
    public void correctForm() throws AuthenticationException {
        String header = "Bearer asd123.sda2.123rase2";
        extractor.extractToken(header);
    }

}