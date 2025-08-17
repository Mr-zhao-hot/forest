package com.example.forest.model.cache;

import com.example.forest.model.persist.entity.Equipment;
import com.example.forest.model.persist.vo.equipment.EquipmentVo;

public interface EquipmentCache {
    EquipmentVo select(Integer id);

    void setequipmentCache(Equipment equipmentmapper);
}
