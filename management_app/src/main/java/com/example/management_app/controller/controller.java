package com.example.management_app.controller;

import java.util.List;
import java.sql.ResultSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.management_app.repository.User;
import com.example.management_app.repository.UserRepository;
import com.example.management_app.repository.newUser;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class controller {
    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/home")
    public String home() {
        return "/home";
    }

    @RequestMapping("/register")
    public String register() {
        return "/register";
    }

    @RequestMapping(value="/register", method=RequestMethod.POST)
    public String userRegister(@ModelAttribute("new_user") newUser user, Model model) {
        User n = new User();
        n.setName(user.name);
        userRepository.save(n);
        return "/register";
    }

    @RequestMapping(value="/delete/{id}", method=RequestMethod.POST)
    public String userDelete(@PathVariable Integer id) {  
        userRepository.deleteById(id);
        return "redirect:/summary";
    }

    @RequestMapping("/summary")
    public String summary(Model model) {
        Iterable<User> userList = userRepository.findAll();
        model.addAttribute("userList", userList);
        return "/summary";
    }

}