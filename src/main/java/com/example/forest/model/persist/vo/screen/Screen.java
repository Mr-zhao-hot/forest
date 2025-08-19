package com.example.forest.model.persist.vo.screen;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Screen implements Serializable {
//    // 当前温度
//    private String temNow;
    // 最大烟浓度
    private Double smokeAvg;
    // 最小烟浓度
    private Double smokeMin;
    // 平均烟浓度
    private Double smokeMax;
    // 完成任务数量
    private Integer taskSuccessNum;
    // 异常任务数量
    private Integer taskFailNum;



}
