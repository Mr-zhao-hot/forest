package com.example.forest.controller;

import com.example.forest.common.JsonOk;
import com.example.forest.model.persist.entity.RegionTree;
import com.example.forest.service.RegionTreeService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Regions")
public class Regions {

    @Resource
    private RegionTreeService regionTreeService;

    @GetMapping("/tree")
    public JsonOk<List<RegionTree>> getRegionTree() {
        return JsonOk.success(regionTreeService.getFullTree());
    }

    @PostMapping
    public JsonOk<Void> addRegion(@RequestBody RegionTree region) {
        regionTreeService.addNode(region);
        return JsonOk.success();
    }

}
