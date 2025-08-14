package com.example.forest.model.cache.impl;

import com.example.forest.model.cache.TreeSpeciesCache;
import com.example.forest.model.persist.constant.SystemUserConstant;
import com.example.forest.model.persist.constant.TreeSpeciesConstant;
import com.example.forest.model.persist.entity.TreeSpecies;
import com.example.forest.model.persist.vo.tree.TreeSpeciesVo;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Component
public class TreeSpeciesCacheImpl implements TreeSpeciesCache {

    @Resource
    private RedisTemplate<String, Object> redisTemplate;

    @Value("${secretKey}")
    private String secretKey;

    @Value("${durationInMinute}")
    private Long durationInMinute;

    // 查询单个树种
    @Override
    public TreeSpeciesVo getSelectById(Integer id) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        return (TreeSpeciesVo) valueOperations.get(SystemUserConstant.SYSTEM_USER + id);
    }

    // 存入单个树种
    @Override
    public void setSelectById(Integer id, TreeSpecies treeSpecies) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(TreeSpeciesConstant.TREE_SELECT_ID + id, treeSpecies, durationInMinute, TimeUnit.MINUTES);
    }

    // 查询全部树种 缓存
    @Override
    public List<TreeSpeciesVo> getSelects() {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        return (List<TreeSpeciesVo>) valueOperations.get(TreeSpeciesConstant.TREE_IDS);
    }

    // 存入全部树种
    @Override
    public void setSelects(List<TreeSpeciesVo> selects) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(TreeSpeciesConstant.TREE_IDS, selects, durationInMinute, TimeUnit.MINUTES);
    }
}
