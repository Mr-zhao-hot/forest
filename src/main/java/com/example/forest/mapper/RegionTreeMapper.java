package com.example.forest.mapper;

import com.example.forest.model.persist.entity.RegionTree;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
* @author Mr_zh
* @description 针对表【region_tree(区域树形表)】的数据库操作Mapper
* @createDate 2025-08-14 16:01:33
* @Entity com.example.forest.model.persist.entity.RegionTree
*/
public interface RegionTreeMapper extends BaseMapper<RegionTree> {

    @Select("SELECT * FROM region_tree WHERE parent_id = #{parentId} ORDER BY sequence")
    List<RegionTree> selectByParentId(Long parentId);
}




