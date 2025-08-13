package com.example.forest.controller;
import com.example.forest.common.JsonOk;
import com.example.forest.model.persist.param.systemuser.SystemUserLoginParam;
import com.example.forest.model.persist.param.systemuser.SystemUserRegisterParam;
import com.example.forest.service.impl.SystemUserServiceImpl;
import com.example.forest.utils.annotation.log.TimeLog;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.cache.annotation.Cacheable;

@RestController
@RequestMapping("/user")
public class UserController {


    @Resource
    private SystemUserServiceImpl systemUserServiceImpl;


    // 用户登录操作
    @TimeLog
    @PostMapping("/systemlogin")
    @Cacheable(value = "Login", key = "'LoginSelect'")
    public JsonOk login(@RequestBody SystemUserLoginParam systemUserLoginParam, HttpServletRequest request) {
        return JsonOk.success("登录成功",systemUserServiceImpl.login(systemUserLoginParam.getPhone(), systemUserLoginParam.getPassword(),
                request.getRemoteAddr(),
                request.getHeader("User-Agent"))
        );
    }


    // 注册操作
    @TimeLog
    @PostMapping("/register")
    public JsonOk register(@RequestBody SystemUserRegisterParam systemUserRegisterParam, HttpServletRequest request) {
        systemUserServiceImpl.register(systemUserRegisterParam,request.getRemoteAddr());
        return JsonOk.success("注册成功");
    }

}
