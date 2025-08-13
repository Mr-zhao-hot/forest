package com.example.forest.model.cache.impl;
import com.example.forest.mapper.MenuMapper;
import com.example.forest.model.cache.MenuCache;
import com.example.forest.model.persist.constant.MenuConstant;
import com.example.forest.model.persist.vo.menu.MenuVo;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;


@Component
public class MenuCacheImpl implements MenuCache {

    @Resource
    private MenuMapper menuMapper;

    @Resource
    private RedisTemplate<String, Object> redisTemplate;


    @Value("${secretKey}")
    private String secretKey;

    @Value("${durationInMinute}")
    private Long durationInMinute;



    // 查询单个菜单缓存
    @Override
    public MenuVo SelectMenuById(Integer id) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        return (MenuVo) valueOperations.get(MenuConstant.MENU_ID + id);
    }

    @Override
    public void setSelectMenuById(Integer id, MenuVo menuVo) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(MenuConstant.MENU_ID + id, menuVo, durationInMinute, TimeUnit.MINUTES);
    }
}
