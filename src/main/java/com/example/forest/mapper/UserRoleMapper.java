package com.example.forest.mapper;

import com.example.forest.model.persist.entity.UserRole;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

/**
* @author Mr_zh
* @description 针对表【user_role(用户角色关联表)】的数据库操作Mapper
* @createDate 2025-08-13 09:54:42
* @Entity com.example.forest.model.persist.entity.UserRole
*/
public interface UserRoleMapper extends BaseMapper<UserRole> {
    void insert( @Param("userId") Integer userId,
                 @Param("roleId") Integer roleId  );
}




