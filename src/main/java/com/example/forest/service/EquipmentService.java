package com.example.forest.service;

import com.example.forest.model.persist.entity.Equipment;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.forest.model.persist.param.equipment.EquipmentPageParam;
import com.example.forest.model.persist.param.equipment.EquipmentParam;
import com.example.forest.model.persist.vo.equipment.EquipmentVo;
import com.github.pagehelper.PageInfo;

import java.util.List;

/**
* @author Mr_zh
* @description 针对表【equipment(设备登记表)】的数据库操作Service
* @createDate 2025-08-17 09:54:04
*/
public interface EquipmentService extends IService<Equipment> {

    EquipmentVo select(Integer id);


    void add(EquipmentParam equipmentParam);

    void delete(Integer id);

    void deletes(List<Integer> ids);

    PageInfo<Equipment> selectPageList(EquipmentPageParam equipmentpageParam);

    void equipmentUpdate(Integer id, EquipmentParam equipmentParam);
}
