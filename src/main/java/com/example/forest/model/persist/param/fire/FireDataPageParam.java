package com.example.forest.model.persist.param.fire;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FireDataPageParam implements Serializable {
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
     * 经度
     */
    private BigDecimal longitude;

    /**
     * 纬度
     */
    private BigDecimal latitude;


    /**
     * 方位角(0-360度)
     */
    private BigDecimal azimuth;


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
     * 状态(0:未处理,1:处理中,2:已处理,3:误报)
     */
    private Integer status;

    /**
     * 创建者/上报人
     */
    private String createName;

}
