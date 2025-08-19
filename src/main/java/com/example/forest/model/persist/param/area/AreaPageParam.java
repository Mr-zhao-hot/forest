package com.example.forest.model.persist.param.area;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AreaPageParam implements Serializable {
    /**
     * 一页显示多少数据
     */
    private Integer pageSize;


    /**
     * 页码
     */
    private Integer pageNumber;

    /**
     * 起火点
     */
    private String firePoint;

    /**
     * 救援车
     */
    private String rescueVehicle;

    /**
     * 巡检车
     */
    private String inspectionVehicle;

    /**
     * 消防车
     */
    private String fireTruck;

    /**
     * 清障车
     */
    private String wrecker;

    @Serial
    private static final long serialVersionUID = 1L;
}
