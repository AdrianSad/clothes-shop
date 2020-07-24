package pl.adrian.clothesshop.services;

import org.springframework.stereotype.Service;
import pl.adrian.clothesshop.models.User;
import pl.adrian.clothesshop.repositories.UserRepository;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getUser(Long id) {
        Optional<User> userOptional = userRepository.findById(id);

        if(userOptional.isPresent()){
            return userOptional.get();
        } else {
            throw new RuntimeException("User Not Found");
        }
    }
}
