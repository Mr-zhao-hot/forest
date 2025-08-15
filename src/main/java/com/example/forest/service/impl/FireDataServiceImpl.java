package com.example.forest.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.example.forest.model.persist.entity.FireData;
import com.example.forest.service.FireDataService;
import com.example.forest.mapper.FireDataMapper;
import org.springframework.stereotype.Service;

/**
* @author Mr_zh
* @description 针对表【fire_data(火灾报警记录表)】的数据库操作Service实现
* @createDate 2025-08-15 19:16:20
*/
@Service
public class FireDataServiceImpl extends ServiceImpl<FireDataMapper, FireData>
    implements FireDataService{

}




