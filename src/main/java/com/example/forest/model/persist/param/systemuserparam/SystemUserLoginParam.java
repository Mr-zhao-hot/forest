package com.example.forest.model.persist.param.systemuserparam;

import lombok.Data;

@Data
public class SystemUserLoginParam {
    /**
     * id
     */
    private Integer id;

    /**
     * 手机号
     */
    private String phone;

    /**
     * 密码(明文)
     */
    private String password;
}
