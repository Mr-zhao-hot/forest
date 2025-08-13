package com.example.forest.model.cache;


import com.example.forest.model.persist.po.systemuserpo.SystemUserLoginPo;
import com.example.forest.model.persist.vo.systemuser.SystemUserVo;

public interface SystemUserCache {
    void setLoginPermissionInfo(String token, SystemUserLoginPo systemUserLoginPo);

    SystemUserVo selectLoginInfo();


    void setLoginInfo(SystemUserVo loginInfo);
}
