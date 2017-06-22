package pl.edu.agh.collection_organiser.utils;

import org.apache.http.auth.AuthenticationException;

public class TokenExtractor {

    private static final String HEADER_PREFIX = "Bearer ";

    public String extractToken(String authHeader) throws AuthenticationException {
        if(!authHeader.startsWith(HEADER_PREFIX)){
            throw new AuthenticationException("Invalid header format.");

        }
        return authHeader.substring(HEADER_PREFIX.length(), authHeader.length());
    }

}
