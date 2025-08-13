package com.example.forest.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.forest.mapper.MenuMapper;
import com.example.forest.model.cache.MenuCache;
import com.example.forest.model.persist.entity.Menu;
import com.example.forest.model.persist.vo.menu.MenuVo;
import com.example.forest.service.MenuService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;


/**
* @author Mr_zh
* @description 针对表【menu】的数据库操作Service实现
* @createDate 2025-08-13 13:43:55
*/
@Service
public class MenuServiceImpl extends ServiceImpl<MenuMapper, Menu>
    implements MenuService {

    @Resource
    private MenuMapper menuMapper;


    @Resource
    private MenuCache menuCache;

    @Override

    public MenuVo selectMenuById(Integer id) {
        // 先查缓存
        MenuVo menuVo1 = menuCache.SelectMenuById(id);
        if (menuVo1 != null) {
            return menuVo1;
        }
        // 再查数据库
        MenuVo menuVo = menuMapper.SelectMenuById(id);
        // 存入缓存
        menuCache.setSelectMenuById(id , menuVo);
        return menuVo;
    }

    @Override
    public List<MenuVo> selectAllMenu() {
        // 查缓存
        List<MenuVo> cachedMenus = menuCache.getSelectAllMenu();
        if (cachedMenus != null && !cachedMenus.isEmpty()) {
            return cachedMenus;
        }

        // 查数据库
        List<MenuVo> menusFromDB = menuMapper.selectAllMenu();

        // 存入缓存
        if (menusFromDB != null && !menusFromDB.isEmpty()) {
            menuCache.setSelectAllMenu(menusFromDB);
        }

        return menusFromDB;
    }
}




