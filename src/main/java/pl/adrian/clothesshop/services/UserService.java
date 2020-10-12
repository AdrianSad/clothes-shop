package pl.adrian.clothesshop.services;

import org.springframework.http.ResponseEntity;
import pl.adrian.clothesshop.models.User;
import pl.adrian.clothesshop.models.payload.request.LoginRequest;
import pl.adrian.clothesshop.models.payload.request.RegisterRequest;

import javax.validation.Valid;
import java.util.List;

public interface UserService {

    User getUser(Long id);

    List<User> getAllUsers();

    ResponseEntity<?> signInUser(LoginRequest loginRequest);

    ResponseEntity<?> signUpUser(RegisterRequest registerRequest);
}
