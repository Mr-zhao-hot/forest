package com.example.forest.model.persist.param.meau;

import com.baomidou.mybatisplus.annotation.TableField;

import java.io.Serializable;

public class MenuParam implements Serializable {
    /**
     * 父菜单ID
     */
    private Long parent_id;

    /**
     * 菜单名称
     */
    private String name;

    /**
     * 前端路由路径
     */
    private String path;

    /**
     * 前端组件路径
     */
    private String component;

    /**
     * 菜单标题
     */
    private String title;

    /**
     * 菜单图标
     */
    private String icon;

    /**
     * 排序
     */
    private Integer sort;

    /**
     * 是否隐藏
     */
    private Integer hidden;

    /**
     * 是否总是显示
     */
    private Integer always_show;

    /**
     * 重定向路径
     */
    private String redirect;

    /**
     * 元数据
     */
    private Object meta;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
