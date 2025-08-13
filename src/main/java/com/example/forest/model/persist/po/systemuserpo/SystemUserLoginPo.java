package com.example.forest.model.persist.po.systemuserpo;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class SystemUserLoginPo implements Serializable {
    /**
     * 登录ip
     */
    private String remoteAddr;

    /**
     * 登录浏览器类型
     */
    private String Again;

    /**
     * 权限列表
     */
    private List<String> permissionCodeList;
}
