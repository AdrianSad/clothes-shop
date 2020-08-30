package pl.adrian.clothesshop.exceptions;

import lombok.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ErrorHandler {

//    @ExceptionHandler(Exception.class)
//    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
//    public ExceptionRestResponse handleCustomException(Exception exception) {
//        return new ExceptionRestResponse(500, exception.getMessage());
//    }

    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionRestResponse handleNotFoundException(NotFoundException exception) {
        return new ExceptionRestResponse(404, exception.getMessage());
    }


    @Value
    public static class ExceptionRestResponse {
        int code;
        String message;

        public ExceptionRestResponse(int i, String message) {
            this.code = i;
            this.message = message;
        }
    }
}
