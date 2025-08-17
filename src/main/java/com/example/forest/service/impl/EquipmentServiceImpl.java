package com.example.forest.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.forest.model.cache.EquipmentCache;
import com.example.forest.model.persist.entity.Equipment;
import com.example.forest.model.persist.entity.TreeSpecies;
import com.example.forest.model.persist.param.equipment.EquipmentPageParam;
import com.example.forest.model.persist.param.equipment.EquipmentParam;
import com.example.forest.model.persist.vo.equipment.EquipmentVo;
import com.example.forest.service.EquipmentService;
import com.example.forest.mapper.EquipmentMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;

/**
* @author Mr_zh
* @description 针对表【equipment(设备登记表)】的数据库操作Service实现
* @createDate 2025-08-17 09:54:04
*/
@Service
public class EquipmentServiceImpl extends ServiceImpl<EquipmentMapper, Equipment>
    implements EquipmentService{

    @Resource
    private EquipmentMapper equipmentMapper;

    @Resource
    private EquipmentCache equipmentCache;

    @Override
    public EquipmentVo select(Integer id) {
        // 查缓存
        EquipmentVo equipmentcache = equipmentCache.select(id);
        if (equipmentcache != null) {
            return equipmentcache;
        }
        // 查数据库
        Equipment equipmentmapper = equipmentMapper.selectById(id);
        EquipmentVo equipmentVo = new EquipmentVo();
        BeanUtils.copyProperties(equipmentmapper, equipmentVo);
        equipmentCache.setequipmentCache(equipmentmapper);
        // 存入缓存
        return equipmentVo;
    }

    @Override
    public void add(EquipmentParam equipmentParam) {
        Equipment equipment = new Equipment();
        BeanUtils.copyProperties(equipmentParam, equipment);
        equipmentMapper.insert(equipment);
    }

    @Override
    public void delete(Integer id) {
        equipmentMapper.deleteById(id);
    }

    @Override
    public void deletes(List<Integer> ids) {
        equipmentMapper.deleteBatchIds(ids);
    }

    @Override
    public PageInfo<Equipment> selectPageList(EquipmentPageParam equipmentpageParam) {
        QueryWrapper<Equipment> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("equipment_name", equipmentpageParam.getEquipmentName());
        queryWrapper.like("status", equipmentpageParam.getStatus());
        queryWrapper.like("use_name",equipmentpageParam.getUseName());
        int pageNum = Math.max(equipmentpageParam.getPageNumber(), 1);
        int pageSize = Math.min(equipmentpageParam.getPageSize(), 100);
        PageHelper.startPage(pageNum, pageSize);
        List<Equipment> list = equipmentMapper.selectList(queryWrapper);
        return new PageInfo<>(list);
    }

    @Override
    public void equipmentUpdate(Integer id, EquipmentParam equipmentParam) {
        Equipment equipment = new Equipment();
        equipment.setId(id);
        BeanUtils.copyProperties(equipmentParam, equipment);
        equipmentMapper.updateById(equipment);
    }
}




