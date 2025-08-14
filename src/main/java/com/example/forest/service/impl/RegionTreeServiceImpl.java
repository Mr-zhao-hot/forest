package com.example.forest.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.forest.model.persist.entity.RegionTree;
import com.example.forest.service.RegionTreeService;
import com.example.forest.mapper.RegionTreeMapper;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
* @author Mr_zh
* @description 针对表【region_tree(区域树形表)】的数据库操作Service实现
* @createDate 2025-08-14 16:01:33
*/
@Service
public class RegionTreeServiceImpl extends ServiceImpl<RegionTreeMapper, RegionTree>
    implements RegionTreeService{

    @Resource
    private RegionTreeMapper regionTreeMapper;

    // 构建完整树形结构
    public List<RegionTree> getFullTree() {
        List<RegionTree> roots = regionTreeMapper.selectByParentId(0L);
        return roots.stream().map(this::buildTree).collect(Collectors.toList());
    }

    private RegionTree buildTree(RegionTree node) {
        List<RegionTree> children = regionTreeMapper.selectByParentId(node.getId());
        if (!children.isEmpty()) {
            node.setChildren(children.stream().map(this::buildTree).collect(Collectors.toList()));
        }
        return node;
    }

    // 添加节点
    public void addNode(RegionTree node) {
        if (node.getParentId() == null) node.setParentId(0L);
        regionTreeMapper.insert(node);
    }


}




