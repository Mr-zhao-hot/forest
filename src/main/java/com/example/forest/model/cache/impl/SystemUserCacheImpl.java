package com.example.forest.model.cache.impl;


import com.example.forest.model.cache.SystemUserCache;
import com.example.forest.model.persist.constant.SystemUserConstant;
import com.example.forest.model.persist.po.systemuserpo.SystemUserLoginPo;
import com.example.forest.model.persist.vo.systemuservo.SystemUserLoginInfoVo;
import com.example.forest.model.persist.vo.systemuservo.SystemUserVo;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
public class SystemUserCacheImpl implements SystemUserCache {

    @Resource
    private RedisTemplate<String, Object> redisTemplate;

    @Value("${secretKey}")
    private String secretKey;

    @Value("${durationInMinute}")
    private Long durationInMinute;



    // 存入权限列表缓存
    @Override
    public void setLoginPermissionInfo(String token, SystemUserLoginPo systemUserLoginPo) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        valueOperations.set( SystemUserConstant.SYSTEM_USER + token, systemUserLoginPo, durationInMinute, TimeUnit.MINUTES);
    }

    // 查登登录信息缓存
    @Override
    public SystemUserVo selectLoginInfo() {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        return (SystemUserVo) valueOperations.get(SystemUserConstant.SYSTEM_USER_ID);
    }

    // 存入登录信息缓存
    @Override
    public void setLoginInfo(SystemUserVo loginInfo) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(SystemUserConstant.SYSTEM_USER_ID, loginInfo,durationInMinute, TimeUnit.MINUTES);
    }








}
