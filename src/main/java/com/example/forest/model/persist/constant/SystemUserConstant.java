package com.example.forest.model.persist.constant;

import java.io.Serial;
import java.io.Serializable;

public class SystemUserConstant implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    // 登录缓存
    public static final String SYSTEM_USER = "SystemUser:";


    // 查询用户缓存
    public static final String SYSTEM_USER_ID = "SystemUserID:";

}
