package com.example.forest.controller;


import com.example.forest.common.JsonOk;
import com.example.forest.model.persist.vo.menu.MenuVo;
import com.example.forest.model.persist.vo.tree.TreeSpeciesVo;
import com.example.forest.service.TreeSpeciesService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/forestManager")
public class ForestManager {

    @Resource
    private TreeSpeciesService treeSpeciesService;

    // 查询单个树种
    @GetMapping("/selectById/{id}")
    public JsonOk<TreeSpeciesVo> selectById(@PathVariable Integer id) {
        return JsonOk.success(treeSpeciesService.selectById(id));
    }
}
