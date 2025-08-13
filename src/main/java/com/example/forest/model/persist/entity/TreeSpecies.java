package com.example.forest.model.persist.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.math.BigDecimal;
import lombok.Data;

/**
 * 树种信息表
 * @TableName tree_species
 */
@TableName(value ="tree_species")
@Data
public class TreeSpecies implements Serializable {
    /**
     * 编号
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

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

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}