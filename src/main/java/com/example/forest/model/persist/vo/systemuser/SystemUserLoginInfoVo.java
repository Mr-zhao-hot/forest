package com.example.forest.model.persist.vo.systemuser;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
public class SystemUserLoginInfoVo implements Serializable {

    /**
     * 用户ID
     */
    private Integer userId;

    /**
     * 用户名
     */
    private String username;

    /**
     * 密码(加密存储)
     */
    private String password;


    /**
     * 电子邮箱
     */
    private String email;

    /**
     * 手机号码
     */
    private String phone;

    /**
     * 状态(0-禁用,1-启用)
     */
    private Integer status;

    /**
     * 最后登录时间
     */
    @JsonFormat(pattern = "yyyy年MM月dd日", timezone = "GMT+8")
    private Date lastLoginTime;

    /**
     * 最后登录IP
     */
    private String lastLoginIp;

    /**
     * 创建时间
     */
    @JsonFormat(pattern = "YYYY-MM-DD HH:mm:ss", timezone = "GMT+8")
    private Date createTime;

    /**
     * 更新时间
     */
    @JsonFormat(pattern = "YYYY-MM-DD HH:mm:ss", timezone = "GMT+8")
    private Date updateTime;

    /**
     * 权限列表
     */
    private List<String> permissionCodeList;
}
