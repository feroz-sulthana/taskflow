package com.taskmanager.backend.service;
import com.taskmanager.backend.dto.LoginRequest;
import com.taskmanager.backend.entity.User;
import com.taskmanager.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String registerUser(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            return "Email already exists!";
        }

        userRepository.save(user);

        return "Registration Successful!";
    }
  public User login(LoginRequest request) {

    Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());

    if (optionalUser.isEmpty()) {
        return null;
    }

    User user = optionalUser.get();

    if (!user.getPassword().equals(request.getPassword())) {
        return null;
    }

    return user;
}

}


