package com.example.forest.model.persist.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import lombok.Data;

/**
 * 火灾报警记录表
 * @TableName fire_data
 */
@TableName(value ="fire_data")
@Data
public class FireData implements Serializable {
    /**
     * 主键ID
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 设备编号
     */
    private String deviceId;

    /**
     * 经度
     */
    private BigDecimal longitude;

    /**
     * 纬度
     */
    private BigDecimal latitude;

    /**
     * 海拔高度(米)
     */
    private BigDecimal altitude;

    /**
     * 方位角(0-360度)
     */
    private BigDecimal azimuth;

    /**
     * 报警等级(1-5,1最低)
     */
    private Integer alarmLevel;

    /**
     * 火灾类型(1:烟雾,2:火焰,3:温度,4:其他)
     */
    private Integer alarmType;

    /**
     * 环境温度(℃)
     */
    private BigDecimal temperature;

    /**
     * 烟雾浓度(%)
     */
    private BigDecimal smokeDensity;

    /**
     * 图片URL
     */
    private String imageUrl;

    /**
     * 状态(0:未处理,1:处理中,2:已处理,3:误报)
     */
    private Integer status;

    /**
     * 创建者/上报人
     */
    private String createName;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}