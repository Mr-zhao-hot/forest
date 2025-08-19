package com.example.forest.model.cache.impl;

import com.example.forest.mapper.MenuMapper;
import com.example.forest.model.cache.FireCache;
import com.example.forest.model.persist.constant.EquipmentConstant;
import com.example.forest.model.persist.vo.fire.FireDataVo;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
public class FireCacheImpl implements FireCache {

    @Resource
    private MenuMapper menuMapper;

    @Resource
    private RedisTemplate<String, Object> redisTemplate;


    @Value("${secretKey}")
    private String secretKey;

    @Value("${durationInMinute}")
    private Long durationInMinute;

    // 查单个数据
    @Override
    public FireDataVo select(Integer id) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        return (FireDataVo) valueOperations.get(EquipmentConstant.EQUIPMENT_SELECT_ID + id);
    }

    // 存入单个数据
    @Override
    public void set(FireDataVo fireMapper) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(EquipmentConstant.EQUIPMENT_SELECT_ID + fireMapper.getId(), fireMapper, durationInMinute, TimeUnit.MINUTES);
    }

}
