package com.example.forest.service;

import com.example.forest.model.persist.entity.TreeSpecies;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.forest.model.persist.param.tree.TreeSpeciesPageParam;
import com.example.forest.model.persist.param.tree.TreeSpeciesParam;
import com.example.forest.model.persist.vo.tree.TreeSpeciesVo;
import com.github.pagehelper.PageInfo;

import java.util.List;

/**
* @author Mr_zh
* @description 针对表【tree_species(树种信息表)】的数据库操作Service
* @createDate 2025-08-13 23:39:56
*/
public interface TreeSpeciesService extends IService<TreeSpecies> {

    TreeSpeciesVo selectById(Integer id);

    List<TreeSpeciesVo> selects();

    void addTree(TreeSpeciesParam treeSpeciesParam);

    void updateTree(TreeSpeciesParam treeSpeciesParam, Integer id);

    void deleteTree(Integer id);

    void deleteTrees(List<Integer> ids);

    PageInfo<TreeSpecies> pageSelectTree(TreeSpeciesPageParam treeSpeciesPageParam);
}
