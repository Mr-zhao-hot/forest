package com.example.forest.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;

import java.io.Serializable;

/**
 * Redis的配置类
 *
 * 该类用于配置和初始化RedisTemplate，并设置连接工厂、键值的序列化方式。
 * 主要作用是提供Spring Data Redis的配置支持，通过RedisTemplate实现与Redis的数据交互。
 */
@Slf4j  // 自动生成日志记录器，方便类中的日志输出
@Configuration  // 声明这是一个配置类，Spring容器会自动加载该配置类
public class RedisConfiguration {

    /**
     * 配置RedisTemplate Bean
     *
     * 该方法用于创建并配置一个RedisTemplate实例，并将其注册到Spring容器中。
     * 通过该Bean，应用可以通过Spring Data Redis访问Redis。
     *
     * @param redisConnectionFactory Redis连接工厂，提供与Redis的连接
     * @return 配置好的RedisTemplate实例
     */
    @Bean  // 将该方法返回的对象注册为Spring Bean，供其他组件注入使用
    public RedisTemplate<String, Serializable> redisTemplate(RedisConnectionFactory redisConnectionFactory) {

        // 创建RedisTemplate对象
        RedisTemplate<String, Serializable> redisTemplate = new RedisTemplate<>();

        // 设置Redis连接工厂，用于建立与Redis的连接
        redisTemplate.setConnectionFactory(redisConnectionFactory);

        // 设置键的序列化方式，这里使用默认的String序列化方式（即Redis中的key会以字符串形式存储）
        redisTemplate.setKeySerializer(RedisSerializer.string());

        // 设置值的序列化方式，这里使用JSON序列化方式（即将Java对象序列化成JSON格式存储在Redis中）
        redisTemplate.setValueSerializer(RedisSerializer.json());

        // 返回配置好的RedisTemplate实例
        return redisTemplate;
    }

}
