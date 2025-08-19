package com.example.forest.service;


import com.baomidou.mybatisplus.extension.service.IService;
import com.example.forest.common.JsonOk;
import com.example.forest.model.persist.entity.Area;
import com.example.forest.model.persist.param.area.AreaPageParam;
import com.example.forest.model.persist.param.area.AreaParam;
import com.example.forest.model.persist.vo.area.AreaVo;
import com.github.pagehelper.PageInfo;

import java.util.List;

/**
* @author Mr_zh
* @description 针对表【area(定点记录)】的数据库操作Service
* @createDate 2025-08-19 12:15:36
*/
public interface AreaService extends IService<Area> {

    AreaVo select(Integer id);

    PageInfo<Area> selectPage(AreaPageParam areaParam);

    void updata(Integer id, AreaParam areaParam);

    void delete(Integer id);

    void deletes(List<Integer> ids);

    void insert(AreaParam areaParam);
}

