package com.example.forest.service;

import com.baomidou.mybatisplus.extension.service.IService;

import com.example.forest.model.persist.entity.SystemUser;
import com.example.forest.model.persist.param.systemuserparam.SystemUserRegisterParam;
import com.example.forest.model.persist.vo.systemuservo.SystemUserVo;
import com.github.pagehelper.PageInfo;

import java.util.List;

/**
* @author Mr_zh
* @description 针对表【system_user(系统用户表)】的数据库操作Service
* @createDate 2025-06-25 09:18:46
*/

public interface SystemUserService extends IService<SystemUser> {

    SystemUserVo login(String phone, String password, String remoteAddr, String again);

    void register(SystemUserRegisterParam systemUserRegisterParam, String remoteAddr);
}
