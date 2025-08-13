package com.example.forest.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.forest.model.persist.entity.UserRole;
import com.example.forest.service.UserRoleService;
import com.example.forest.mapper.UserRoleMapper;
import org.springframework.stereotype.Service;

/**
* @author Mr_zh
* @description 针对表【user_role(用户角色关联表)】的数据库操作Service实现
* @createDate 2025-08-13 09:54:42
*/
@Service
public class UserRoleServiceImpl extends ServiceImpl<UserRoleMapper, UserRole>
    implements UserRoleService{

}




