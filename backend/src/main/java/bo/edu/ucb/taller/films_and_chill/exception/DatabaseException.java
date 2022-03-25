package bo.edu.ucb.taller.films_and_chill.exception;

public class DatabaseException extends RuntimeException{

    private final Integer code;

    public DatabaseException(Integer code, String message) {
        super(message);
        this.code = code;
    }
    
    public DatabaseException(Integer code, String message, Throwable cause) {
        super(message, cause);
        this.code = code;
    }

    public Integer getCode() {
        return this.code;
    }
}
