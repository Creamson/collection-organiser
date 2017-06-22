package pl.edu.agh.collection_organiser.config;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.mongodb.MongoClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import pl.edu.agh.collection_organiser.utils.TokenExtractor;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Collections;

@Configuration
public class AppConfig {

    @Value("${google.client.info}")
    private String clientInfo;

    @Bean
    public MongoTemplate mongoTemplate() throws Exception {
        return new MongoTemplate(new MongoClient("127.0.0.1"), "collectionOrganiser");
    }

    @Bean
    public Jackson2ObjectMapperBuilder objectMapperBuilder() {
        return new Jackson2ObjectMapperBuilder() {

            @Override
            public void configure(ObjectMapper objectMapper) {
                super.configure(objectMapper);
                objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);

            }

        };

    }

    @Bean
    public GoogleIdTokenVerifier googleIdTokenVerifier() throws IOException {
        String clientID = fetchClientID();
        return new GoogleIdTokenVerifier
                .Builder(new NetHttpTransport(), new JacksonFactory())
                .setAudience(Collections.singletonList(clientID))
                .build();
    }

    @Bean
    public TokenExtractor tokenExtractor() {
        return new TokenExtractor();
    }

    private String fetchClientID() throws IOException {
        return this.clientInfo;
    }
}
