package com.example.forest.mapper;

import com.example.forest.model.persist.entity.TreeSpecies;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.forest.model.persist.vo.tree.TreeSpeciesVo;
import org.mapstruct.Mapper;

import java.util.List;

/**
* @author Mr_zh
* @description 针对表【tree_species(树种信息表)】的数据库操作Mapper
* @createDate 2025-08-13 23:39:56
* @Entity com.example.forest.model.persist.entity.TreeSpecies
*/


@Mapper(componentModel = "spring")
public interface TreeSpeciesMapper extends BaseMapper<TreeSpecies> {

    List<TreeSpeciesVo> selects();


}




