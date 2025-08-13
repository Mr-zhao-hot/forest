package com.example.forest.service;


import com.baomidou.mybatisplus.extension.service.IService;
import com.example.forest.model.persist.entity.Menu;
import com.example.forest.model.persist.param.meau.MenuPageParam;
import com.example.forest.model.persist.param.meau.MenuParam;
import com.example.forest.model.persist.vo.menu.MenuVo;

import com.example.forest.model.persist.vo.menu.RouterVo;
import com.github.pagehelper.PageInfo;

import java.util.List;


/**
* @author Mr_zh
* @description 针对表【menu】的数据库操作Service
* @createDate 2025-08-13 13:43:55
*/
public interface MenuService extends IService<Menu> {

    MenuVo selectMenuById(Integer id);

    List<MenuVo> selectAllMenu();

    void addMenu(MenuParam menuParam);

    void updateMenu(MenuParam menuParam, Integer id);

    void deleteMenu(Integer id);

    void deletesMenu(List<Integer> ids);


    PageInfo<MenuVo> pageSelectMenu(MenuPageParam menuPageParam);

}
