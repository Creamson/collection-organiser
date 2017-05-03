package pl.edu.agh.collectionOrganiser.config;

import com.mongodb.MongoClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.net.UnknownHostException;

@Configuration
public class AppConfig {

    @Bean
    public MongoClient mongoClient() throws UnknownHostException {
        MongoClient client = new MongoClient();
        Runtime.getRuntime().addShutdownHook(new Thread(client::close));
        return client;
    }

}
