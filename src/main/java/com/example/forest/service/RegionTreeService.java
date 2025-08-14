package com.example.forest.service;

import com.example.forest.model.persist.entity.RegionTree;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
* @author Mr_zh
* @description 针对表【region_tree(区域树形表)】的数据库操作Service
* @createDate 2025-08-14 16:01:33
*/
public interface RegionTreeService extends IService<RegionTree> {

    List<RegionTree> getFullTree();

    void addNode(RegionTree region);
}
