package com.example.forest.model.cache.impl;

import com.example.forest.mapper.MenuMapper;
import com.example.forest.model.cache.EquipmentCache;
import com.example.forest.model.persist.constant.EquipmentConstant;
import com.example.forest.model.persist.constant.MenuConstant;
import com.example.forest.model.persist.entity.Equipment;
import com.example.forest.model.persist.vo.equipment.EquipmentVo;
import com.example.forest.service.EquipmentService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
public class EquipmentCacheImpl implements EquipmentCache {

    @Resource
    private MenuMapper menuMapper;

    @Resource
    private RedisTemplate<String, Object> redisTemplate;


    @Value("${secretKey}")
    private String secretKey;

    @Value("${durationInMinute}")
    private Long durationInMinute;

    // 查单单个设备
    @Override
    public EquipmentVo select(Integer id) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        return (EquipmentVo) valueOperations.get(EquipmentConstant.EQUIPMENT_SELECT_ID + id);
    }

    // 存入单个设备
    @Override
    public void setequipmentCache(Equipment equipmentmapper) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(EquipmentConstant.EQUIPMENT_SELECT_ID , equipmentmapper, durationInMinute, TimeUnit.MINUTES);
    }
}
