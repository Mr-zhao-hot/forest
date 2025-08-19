package com.example.forest.model.persist.vo.area;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class AreaVo implements Serializable {
    /**
     * 主键ID
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

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

    /**
     * 创建时间
     */
    private Date createdAt;

    /**
     * 更新时间
     */
    private Date updatedAt;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}
