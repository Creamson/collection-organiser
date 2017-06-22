package pl.edu.agh.collection_organiser.exceptions;

import org.springframework.dao.DataAccessException;

public class NotFoundException extends DataAccessException {
    public NotFoundException(String msg) {
        super(msg);
    }
}
