package com.example.forest.controller;


import com.example.forest.common.JsonOk;
import com.example.forest.model.persist.entity.TreeSpecies;
import com.example.forest.model.persist.param.tree.TreeSpeciesPageParam;
import com.example.forest.model.persist.param.tree.TreeSpeciesParam;
import com.example.forest.model.persist.vo.tree.TreeSpeciesVo;
import com.example.forest.service.TreeSpeciesService;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    // 查询全部树木
    @GetMapping("/selects")
    public JsonOk<List<TreeSpeciesVo>> selects() {
        return JsonOk.success(treeSpeciesService.selects());
    }

    // 新增树木
    @PostMapping("/addTree")
    public JsonOk<String> addTree(@RequestBody TreeSpeciesParam treeSpeciesParam) {
        treeSpeciesService.addTree(treeSpeciesParam);
        return JsonOk.success("新增成功");
    }

    // 修改树木
    @PostMapping("/updateTree/{id}")
    public JsonOk<String> updateTree(@RequestBody TreeSpeciesParam treeSpeciesParam , @PathVariable Integer id) {
        treeSpeciesService.updateTree(treeSpeciesParam,id);
        return JsonOk.success("修改成功");
    }

    // 删除树木
    @PostMapping("/deleteTree/{id}")
    public JsonOk<String> deleteTree(@PathVariable Integer id) {
        treeSpeciesService.deleteTree(id);
        return JsonOk.success("删除成功");
    }


    // 批量删除树木
    @PostMapping("/deletesTree")
    public JsonOk<String> deleteTrees(@RequestBody List<Integer> ids) {
        treeSpeciesService.deleteTrees(ids);
        return JsonOk.success("删除成功");
    }

    // 分页查询
    @PostMapping("/pageSelectTree")
    public JsonOk<PageInfo<TreeSpecies>> pageSelectTree(@RequestBody TreeSpeciesPageParam treeSpeciesPageParam) {
        return JsonOk.success(treeSpeciesService.pageSelectTree(treeSpeciesPageParam));
    }
}
