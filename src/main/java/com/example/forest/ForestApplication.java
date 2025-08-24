package com.example.forest;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@MapperScan("com.example.forest.mapper")
@EnableCaching
public class ForestApplication {
    public static void main(String[] args) {
        SpringApplication.run(ForestApplication.class, args);
        System.out.println("启动成功");
    }
}
