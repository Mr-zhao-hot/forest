package com.example.forest.common;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public enum ServiceCode {
    SUCCESS_CODE(200000,"接口访问成功"),
    FAIL_CODE(400000,"接口请求失败"),
    FORBIDDEN(403,"权限不足"),
    UNAUTHORIZED(401,"未登录")
    ;


    private int code;
    private String message;



}
