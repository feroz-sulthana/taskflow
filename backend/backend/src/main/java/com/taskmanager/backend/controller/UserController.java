package com.taskmanager.backend.controller;
import com.taskmanager.backend.dto.LoginRequest;
import com.taskmanager.backend.entity.User;
import com.taskmanager.backend.service.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:5173", "https://taskflow-13.onrender.com"})
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }
  

@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {

    User user = userService.login(request);

    if (user == null) {
        return ResponseEntity.badRequest().body("Invalid Email or Password");
    }

    Map<String, Object> response = new HashMap<>();
    response.put("message", "Login Successful");
    response.put("user", user);

    return ResponseEntity.ok(response);
}

}

