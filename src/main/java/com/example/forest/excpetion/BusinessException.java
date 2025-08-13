package com.example.forest.excpetion;


import com.example.forest.common.ServiceCode;
import lombok.Getter;

@Getter
public class BusinessException extends RuntimeException {
    private final ServiceCode serviceCode;
    private final String description;

    // 构造函数1：强制要求所有字段（包括详细描述）
    public BusinessException(ServiceCode serviceCode, String description) {
        super(description);  // 将 description 作为默认消息
        this.serviceCode = serviceCode;
        this.description = description;
    }

    // 构造函数2：可选自定义消息（覆盖默认的description）
    public BusinessException(String message, ServiceCode serviceCode, String description) {
        super(message);  // 使用自定义消息
        this.serviceCode = serviceCode;
        this.description = description;
    }

}
