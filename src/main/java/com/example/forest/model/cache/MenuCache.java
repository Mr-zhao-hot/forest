package com.example.forest.model.cache;

import com.example.forest.model.persist.vo.menu.MenuVo;

public interface MenuCache {
    MenuVo SelectMenuById(Integer id);

    void setSelectMenuById(Integer id ,  MenuVo menuVo);
}

