package com.example.forest.controller;

import com.example.forest.common.JsonOk;
import com.example.forest.model.persist.entity.Equipment;
import com.example.forest.model.persist.param.equipment.EquipmentPageParam;
import com.example.forest.model.persist.param.equipment.EquipmentParam;
import com.example.forest.model.persist.vo.equipment.EquipmentVo;
import com.example.forest.service.EquipmentService;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/equipment")
public class EquipmentController {
    @Resource
    private EquipmentService equipmentService;

    // 查询单个设备列表
    @GetMapping("/select/{id}")
    public JsonOk<EquipmentVo> select(@PathVariable Integer id) {
        return JsonOk.success(equipmentService.select(id));
    }

    // 新增
    @PostMapping("/add")
    public JsonOk add(@RequestBody EquipmentParam equipmentParam) {
        equipmentService.add(equipmentParam);
        return JsonOk.success("新增成功");
    }
    // 删除
    @PostMapping("/delete/{id}")
    public JsonOk delete(@PathVariable Integer id) {
        equipmentService.delete(id);
        return JsonOk.success("删除成功");
    }
    // 分页查
    @PostMapping("selectPageList")
    public JsonOk<PageInfo<Equipment>> selectPageList(@RequestBody EquipmentPageParam equipmentpageParam) {
        return JsonOk.success(equipmentService.selectPageList(equipmentpageParam));
    }
    // 批量删
    @PostMapping("/deletes")
    public JsonOk deletes(@RequestBody List<Integer> ids) {
        equipmentService.deletes(ids);
        return JsonOk.success("删除成功");
    }

    // 修改设备接口
    @PostMapping("/update/{id}")
    public JsonOk update(@PathVariable Integer id, @RequestBody EquipmentParam equipmentParam) {
        equipmentService.equipmentUpdate(id,equipmentParam);
        return JsonOk.success("修改成功");
    }
}
