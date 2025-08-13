package com.example.forest.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.forest.model.persist.entity.Role;
import com.example.forest.service.RoleService;
import com.example.forest.mapper.RoleMapper;
import org.springframework.stereotype.Service;

/**
* @author Mr_zh
* @description 针对表【role(系统角色表)】的数据库操作Service实现
* @createDate 2025-08-13 09:54:00
*/
@Service
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role>
    implements RoleService{

}




