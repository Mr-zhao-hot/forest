package com.example.forest.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.forest.model.persist.entity.Equipment;
import com.example.forest.service.EquipmentService;
import com.example.forest.mapper.EquipmentMapper;
import org.springframework.stereotype.Service;

/**
* @author Mr_zh
* @description 针对表【equipment(设备登记表)】的数据库操作Service实现
* @createDate 2025-08-17 09:54:04
*/
@Service
public class EquipmentServiceImpl extends ServiceImpl<EquipmentMapper, Equipment>
    implements EquipmentService{

}




