package com.example.forest.common;

import lombok.Getter;
import lombok.Setter;
import org.jetbrains.annotations.Contract;
import org.jetbrains.annotations.NotNull;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
public class JsonOk<T> implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String message;
    private int code;
    private T data;


    // 全参构造器
    public JsonOk(String message, int code, T data) {
        this.message = message;
        this.code = code;
        this.data = data;
    }


    // 成功响应的快捷方法
    public static <T> JsonOk<T> success(T data) {
        return new JsonOk<>(null, ServiceCode.SUCCESS_CODE.getCode(), data);
    }

    // 成功响应的快捷方法
    public static <T> JsonOk<T> success() {
        return new JsonOk<>(null, ServiceCode.SUCCESS_CODE.getCode(), null);
    }



    // 成功响应的快捷方法
    @Contract("_ -> new")
    public static <T> @NotNull JsonOk<T> success(String message) {
        return new JsonOk<>(message, ServiceCode.SUCCESS_CODE.getCode(), null);
    }


    // 成功响应方法
    public static <T> JsonOk<T> success(String message,T data) {
        return new JsonOk<>(message, ServiceCode.SUCCESS_CODE.getCode(),  data);
    }

    // 失败响应的快捷方法
    public static <T> JsonOk<T> error(String message, int code) {
        return new JsonOk<>(message, code, null);
    }

    // 失败响应的快捷方法(Security)
    public static JsonOk error(String message, ServiceCode serviceCode) {
        return new JsonOk<>(message, serviceCode.getCode(), null);
    }
}
