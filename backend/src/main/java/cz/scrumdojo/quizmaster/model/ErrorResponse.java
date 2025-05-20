package cz.scrumdojo.quizmaster.model;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@Builder
@ToString
public class ErrorResponse {
    private String message;
    private int errorCode;
    private String errorId;

    public ErrorResponse(String message, int errorCode, String errorId) {
        this.message = message;
        this.errorCode = errorCode;
        this.errorId = errorId;
    }

}
