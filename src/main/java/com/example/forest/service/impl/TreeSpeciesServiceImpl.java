package com.example.forest.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.forest.model.cache.TreeSpeciesCache;
import com.example.forest.model.persist.entity.TreeSpecies;
import com.example.forest.model.persist.vo.tree.TreeSpeciesVo;
import com.example.forest.service.TreeSpeciesService;
import com.example.forest.mapper.TreeSpeciesMapper;
import jakarta.annotation.Resource;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

/**
* @author Mr_zh
* @description 针对表【tree_species(树种信息表)】的数据库操作Service实现
* @createDate 2025-08-13 23:39:56
*/
@Service
public class TreeSpeciesServiceImpl extends ServiceImpl<TreeSpeciesMapper, TreeSpecies>
    implements TreeSpeciesService{

    @Resource
    private TreeSpeciesMapper treeSpeciesMapper;


    @Resource
    private TreeSpeciesCache treeSpeciesCache;

    // 查询单个树种
    @Override
    public TreeSpeciesVo selectById(Integer id) {
        TreeSpeciesVo result = new TreeSpeciesVo();
        TreeSpeciesVo cached = treeSpeciesCache.getSelectById(id);
        // 查缓存
        if(cached != null) {
            BeanUtils.copyProperties(cached, result); // 创建副本返回
            return result;
        }
        // 查数据库

        TreeSpecies treeSpecies = treeSpeciesMapper.selectById(id);
        BeanUtils.copyProperties(treeSpecies,result);
        // 存入缓存
        treeSpeciesCache.setSelectById(id,treeSpecies);
        return result;
    }


}




