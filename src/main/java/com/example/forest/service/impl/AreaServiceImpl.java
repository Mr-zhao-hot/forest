package com.example.forest.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.example.forest.common.JsonOk;
import com.example.forest.model.persist.entity.Area;
import com.example.forest.model.persist.param.area.AreaPageParam;
import com.example.forest.model.persist.param.area.AreaParam;
import com.example.forest.model.persist.vo.area.AreaVo;
import com.example.forest.service.AreaService;
import com.example.forest.mapper.AreaMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;

/**
* @author Mr_zh
* @description 针对表【area(定点记录)】的数据库操作Service实现
* @createDate 2025-08-19 12:15:36
*/
@Service
public class AreaServiceImpl extends ServiceImpl<AreaMapper, Area>
    implements AreaService{

    @Resource
    private AreaMapper areaMapper;

    @Override
    public AreaVo select(Integer id) {
        AreaVo areaVo = new AreaVo();
        Area area = areaMapper.selectById(id);
        BeanUtils.copyProperties(area, areaVo);
        return areaVo;
    }

    @Override
    public PageInfo<Area> selectPage(AreaPageParam areaPageParam) {
        int pageNum = Math.max(areaPageParam.getPageNumber(), 1);
        int pageSize = Math.min(areaPageParam.getPageSize(), 100);
        QueryWrapper<Area> queryWrapper = new QueryWrapper<>();
        queryWrapper.like("fire_point", areaPageParam.getFirePoint());
        queryWrapper.like("rescue_vehicle", areaPageParam.getRescueVehicle());
        queryWrapper.like("Inspection_vehicle", areaPageParam.getInspectionVehicle());
        queryWrapper.like("fire_truck", areaPageParam.getFireTruck());
        PageHelper.startPage(pageNum, pageSize);
        List<Area> list  = areaMapper.selectList(queryWrapper);
        return new PageInfo<>(list);
    }

    @Override
    public void updata(Integer id, AreaParam areaParam) {
        Area area = new Area();
        area.setId(id);
        BeanUtils.copyProperties(areaParam, area);
        areaMapper.updateById(area);
    }

    @Override
    public void delete(Integer id) {
        areaMapper.deleteById(id);
    }

    @Override
    public void deletes(List<Integer> ids) {
        areaMapper.deleteBatchIds(ids);
    }

    @Override
    public void insert(AreaParam areaParam) {
        Area area = new Area();
        BeanUtils.copyProperties(areaParam, area);
        areaMapper.insert(area);
    }
}




