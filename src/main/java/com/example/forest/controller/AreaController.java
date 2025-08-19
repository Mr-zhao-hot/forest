package com.example.forest.controller;

import com.example.forest.common.JsonOk;
import com.example.forest.model.persist.entity.Area;
import com.example.forest.model.persist.param.area.AreaPageParam;
import com.example.forest.model.persist.param.area.AreaParam;
import com.example.forest.model.persist.vo.area.AreaVo;
import com.example.forest.service.AreaService;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Area")
public class AreaController {

    @Resource
    private AreaService areaService;

    // 查询接口
    @GetMapping("/select/{id}")
    public JsonOk<AreaVo> select(@PathVariable Integer id) {
        return JsonOk.success(areaService.select(id));
    }

    // 分页查询
    @PostMapping("/select/page")
    public JsonOk<PageInfo<Area>> selectPage(@RequestBody AreaPageParam areaPageParam) {
        return JsonOk.success(areaService.selectPage(areaPageParam));
    }

    // 修改接口
    @PostMapping("update/{id}")
    public JsonOk update(@RequestBody AreaParam areaParam,@PathVariable Integer id) {
        areaService.updata(id,areaParam);
        return JsonOk.success("修改成功");
    }

    // 删除接口
    @PostMapping("delete/{id}")
    public JsonOk delete(@PathVariable Integer id) {
        areaService.delete(id);
        return JsonOk.success("删除成功");
    }

    // 批量删除
    @PostMapping("/deletes")
    public JsonOk deletes(@RequestBody List<Integer> ids) {
        areaService.deletes(ids);
        return JsonOk.success("删除成功");
    }

    // 新增接口
    @PostMapping("/add")
    public JsonOk add(@RequestBody AreaParam areaParam) {
        areaService.insert(areaParam);
        return JsonOk.success("新增成功");
    }

}
