package com.example.forest.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.forest.mapper.TreeSpeciesMapper;
import com.example.forest.model.cache.TreeSpeciesCache;
import com.example.forest.model.persist.constant.TreeSpeciesConstant;
import com.example.forest.model.persist.entity.TreeSpecies;
import com.example.forest.model.persist.param.tree.TreeSpeciesPageParam;
import com.example.forest.model.persist.param.tree.TreeSpeciesParam;
import com.example.forest.model.persist.vo.tree.TreeSpeciesVo;
import com.example.forest.service.TreeSpeciesService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

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

    @Resource
    private RedisTemplate<String, Object> redisTemplate;

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

    // 查询全部树木
    @Override
    public List<TreeSpeciesVo> selects() {
        // 查询缓存
        List<TreeSpeciesVo> treeSpeciesVos = treeSpeciesCache.getSelects();
        if(treeSpeciesVos != null) {
            return treeSpeciesVos;
        }
        List<TreeSpeciesVo> selects = treeSpeciesMapper.selects();
        treeSpeciesCache.setSelects(selects);

        return selects;
    }

    @Override
    public void addTree(TreeSpeciesParam treeSpeciesParam) {
        TreeSpecies treeSpecies = new TreeSpecies();
        BeanUtils.copyProperties(treeSpeciesParam,treeSpecies);
        treeSpeciesMapper.insert(treeSpecies);
    }

    @Override
    public void updateTree(TreeSpeciesParam treeSpeciesParam, Integer id) {
        TreeSpecies treeSpecies = new TreeSpecies();
        treeSpecies.setId(id);
        BeanUtils.copyProperties(treeSpeciesParam,treeSpecies);
        treeSpeciesMapper.updateById(treeSpecies);
    }

    @Override
    public void deleteTree(Integer id) {
        redisTemplate.delete(TreeSpeciesConstant.TREE_SELECT_ID);
        treeSpeciesMapper.deleteById(id);
    }

    @Override
    public void deleteTrees(List<Integer> ids) {
        redisTemplate.delete(TreeSpeciesConstant.TREE_IDS);
        treeSpeciesMapper.deleteBatchIds(ids);
    }

    // 分页查询
    @Override
    public PageInfo<TreeSpecies> pageSelectTree(TreeSpeciesPageParam treeSpeciesPageParam) {
        int pageNum = Math.max(treeSpeciesPageParam.getPageNumber(), 1);
        int pageSize = Math.min(treeSpeciesPageParam.getPageSize(), 100);
        QueryWrapper<TreeSpecies> queryWrapper = new QueryWrapper<>();
        if (StringUtils.hasText(treeSpeciesPageParam.getAttachmentName())) {
            queryWrapper.like("attachment_name", treeSpeciesPageParam.getAttachmentName());
        }
        if (StringUtils.hasText(treeSpeciesPageParam.getScientificName())) {
            queryWrapper.like("scientific_name", treeSpeciesPageParam.getScientificName());
        }
        if (StringUtils.hasText(treeSpeciesPageParam.getFamily())) {
            queryWrapper.like("family",treeSpeciesPageParam.getFamily());
        }
        if (StringUtils.hasText(treeSpeciesPageParam.getProtectionLevel())) {
            queryWrapper.like("protection_level",treeSpeciesPageParam.getProtectionLevel());
        }
        PageHelper.startPage(pageNum, pageSize);
        List<TreeSpecies> list = treeSpeciesMapper.selectList(queryWrapper);

        return new PageInfo<>(list);
    }


}




