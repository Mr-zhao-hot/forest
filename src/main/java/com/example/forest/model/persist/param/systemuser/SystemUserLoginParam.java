package com.example.forest.model.persist.param.systemuser;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
public class SystemUserLoginParam implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

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
