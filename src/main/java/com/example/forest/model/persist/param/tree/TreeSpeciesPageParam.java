package com.example.forest.model.persist.param.tree;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TreeSpeciesPageParam implements Serializable {
    /**
     * 一页显示多少数据
     */
    private Integer pageSize;


    /**
     * 页码
     */
    private Integer pageNumber;
    /**
     * 树种名称
     */
    private String attachmentName;

    /**
     * 学名
     */
    private String scientificName;

    /**
     * 所属科
     */
    private String family;

    /**
     * 保护级别
     */
    private String protectionLevel;

    /**
     * 高度(m)
     */
    private BigDecimal height;

    /**
     * 直径(cm)
     */
    private BigDecimal diameter;

    /**
     * 寿命(年)
     */
    private Integer lifespan;

    /**
     * 生长环境
     */
    private String growthEnvironment;

    /**
     * 用途
     */
    private String uses;

    @Serial
    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
