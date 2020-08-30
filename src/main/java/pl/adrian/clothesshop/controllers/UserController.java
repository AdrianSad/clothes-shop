package pl.adrian.clothesshop.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.adrian.clothesshop.models.payload.request.LoginRequest;
import pl.adrian.clothesshop.models.payload.request.RegisterRequest;
import pl.adrian.clothesshop.models.payload.response.JwtResponse;
import pl.adrian.clothesshop.security.UserDetailsImpl;
import pl.adrian.clothesshop.services.UserService;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        return userService.signInUser(loginRequest);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {

        return userService.signUpUser(registerRequest);
    }
}
