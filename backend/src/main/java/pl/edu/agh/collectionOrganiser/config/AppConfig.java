package pl.edu.agh.collectionOrganiser.config;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.MongoClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

import java.net.UnknownHostException;

@Configuration
public class AppConfig {

//    @Bean
//    public MongoClient mongoClient() throws UnknownHostException {
//        MongoClient client = new MongoClient();
//        Runtime.getRuntime().addShutdownHook(new Thread(client::close));
//        return client;
//    }

    public @Bean
    MongoTemplate mongoTemplate() throws Exception {

        MongoTemplate mongoTemplate =
                new MongoTemplate(new MongoClient("127.0.0.1"),"collectionOrganiser");
        return mongoTemplate;

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

}
