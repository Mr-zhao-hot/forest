package com.example.forest.model.cache;

import com.example.forest.model.persist.vo.menu.MenuVo;

import java.util.List;

public interface MenuCache {
    MenuVo SelectMenuById(Integer id);

    void setSelectMenuById(Integer id ,  MenuVo menuVo);

    void setSelectAllMenu(List<MenuVo> menuVot);

    List<MenuVo> getSelectAllMenu();
}

