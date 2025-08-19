package com.example.forest.model.persist.param.fire;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FireDataParam implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

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
}
