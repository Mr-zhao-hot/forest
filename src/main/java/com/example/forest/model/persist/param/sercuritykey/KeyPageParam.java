package com.example.forest.model.persist.param.sercuritykey;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KeyPageParam implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;
    /**
     * 一页显示多少数据
     */
    private Integer pageSize;


    /**
     * 页码
     */
    private Integer pageNumber;

    /**
     * 钥匙名字
     */
    private String keyName;

    /**
     * 钥匙密令
     */
    private String keyPassword;

    /**
     * 创建人
     */
    private String keyCreateName;
}
