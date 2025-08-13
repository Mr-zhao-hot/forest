package com.example.forest.model.persist.vo.menu;

import lombok.Data;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
public class RouterVo implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 路由路径
     */
    private String path;

    /**
     * 组件路径
     *  - 基础布局组件通常为 "Layout"
     *  - 其他为具体的组件路径如 "system/user/index"
     */
    private String component;

    /**
     * 重定向地址
     */
    private String redirect;

    /**
     * 路由名称（唯一）
     */
    private String name;

    /**
     * 路由元信息
     */
    private Meta meta;

    /**
     * 子路由
     */
    private List<RouterVo> children;

    /**
     * 路由元数据内部类
     */
    @Data
    public static class Meta implements Serializable {
        private static final long serialVersionUID = 1L;

        /**
         * 菜单名称（支持i18n时可作为key使用）
         */
        private String title;

        /**
         * 菜单图标
         */
        private String icon;

        /**
         * 是否隐藏菜单
         */
        private Boolean hidden;

        /**
         * 是否总是显示根菜单
         */
        private Boolean alwaysShow;

        /**
         * 其他扩展属性
         */
        private Map<String, Object> extend;

        public Meta() {
            this.extend = new HashMap<>();
        }
        // 自定义 getter 方法
        public boolean isAlwaysShow() {
            return alwaysShow != null ;
        }
        /**
         * 添加扩展属性
         */
        public Meta addExtend(String key, Object value) {
            this.extend.put(key, value);
            return this;
        }
    }
}
