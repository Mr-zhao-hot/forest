package com.example.forest.model.cache;

import com.example.forest.model.persist.entity.TreeSpecies;
import com.example.forest.model.persist.vo.tree.TreeSpeciesVo;

import java.util.List;

public interface TreeSpeciesCache {
    TreeSpeciesVo getSelectById(Integer id);

    void setSelectById(Integer id, TreeSpecies treeSpecies);

    List<TreeSpeciesVo> getSelects();

    void setSelects(List<TreeSpeciesVo> selects);
}
