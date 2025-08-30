package com.example.forest.model.persist.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

/**
 * 区域树形表
 * @TableName region_tree
 */
@TableName(value ="region_tree")
@Data
public class RegionTree implements Serializable {
    /**
     * 主键ID
     */
    @TableId(type = IdType.AUTO)
    private Long id;

    /**
     * 父节点ID(0表示根节点)
     */
    private Long parentId;

    /**
     * 区域名称
     */
    private String name;

    /**
     * 显示顺序
     */
    private Integer sequence;

    /**
     * 面积(公顷)
     */
    private BigDecimal areaHectares;

    /**
     * 节点层级(1工区/2林班/3小班)
     */
    private Integer level;

    /**
     * 
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createTime;

    /**
     * 
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date updateTime;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
    @TableField(exist = false)
    private List<RegionTree> children;

}