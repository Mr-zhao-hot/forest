package com.example.forest.model.persist.vo.menu;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Data
public class MenuVo implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(type = IdType.AUTO)
    private Long id;
    private Long parent_id;          // 父菜单ID
    private String name;            // 菜单名称
    private String path;            // 前端路由路径
    private String component;       // 前端组件路径
    private String title;           // 菜单标题
    private String icon;            // 菜单图标
    private Integer sort;           // 排序
    private Integer hidden;         // 是否隐藏 (0-否,1-是)
    private Integer always_show;    // 是否总是显示 (0-否,1-是)
    private String redirect;        // 重定向路径
    private Object meta;            // 元数据

    /**
     * 子菜单列表
     */
    private List<MenuVo> children;
}