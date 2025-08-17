package com.example.forest.model.persist.param.equipment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EquipmentPageParam implements Serializable {
    /**
     * 一页显示多少数据
     */
    private Integer pageSize;


    /**
     * 页码
     */
    private Integer pageNumber;


    /**
     * 设备名称
     */
    private String equipmentName;

    /**
     * 状态
     */
    private String status;

    /**
     * 使用人
     */
    private String useName;

    /**
     * 备注
     */
    private String remark;

    @Serial
    private static final long serialVersionUID = 1L;

}
