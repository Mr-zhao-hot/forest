package com.example.forest.model.persist.constant;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
public class MenuConstant implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    public static final String MENU_ID = "MenuID:";
}
