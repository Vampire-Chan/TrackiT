package com.yourpackage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // Handle User Registration
    @PostMapping("/register")
    public String register(@RequestParam("username") String username, @RequestParam("password") String password, Model model) {
        // Basic validation for empty fields
        if (username == null || password == null || username.isEmpty() || password.isEmpty()) {
            model.addAttribute("error", "Username and password are required");
            return "registration"; // returns to the registration page
        }

        // Check if username already exists
        if (userRepository.findByUsername(username).isPresent()) {
            model.addAttribute("error", "Username already taken");
            return "registration"; // returns to the registration page
        }

        // Save the new user (in real-world, you should hash the password)
        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(password); // Ideally, use a hashed password
        userRepository.save(newUser);

        return "redirect:/login"; // Redirect to login page
    }

    // Handle User Login
    @PostMapping("/login")
    public String login(@RequestParam("username") String username, @RequestParam("password") String password, Model model) {
        // Fetch user from the database
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            return "redirect:/home"; // Redirect to home page if login is successful
        }

        model.addAttribute("error", "Invalid credentials");
        return "login"; // Return to login page
    }
}
