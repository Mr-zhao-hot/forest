package com.example.forest.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.forest.mapper.MenuMapper;
import com.example.forest.model.cache.MenuCache;
import com.example.forest.model.persist.entity.Menu;
import com.example.forest.model.persist.param.meau.MenuPageParam;
import com.example.forest.model.persist.param.meau.MenuParam;
import com.example.forest.model.persist.vo.menu.MenuVo;
import com.example.forest.service.MenuService;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.beans.BeanUtils;
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

    // 新增路由
    @Override
    public void addMenu(MenuParam menuParam) {
        Menu menu = new Menu();
        BeanUtils.copyProperties(menuParam, menu);
        menuMapper.insert(menu);
    }

    @Override
    public void updateMenu(MenuParam menuParam, Integer id) {
        Menu menu = new Menu();
        menu.setId(id);
        BeanUtils.copyProperties(menuParam, menu);
        menuMapper.updateById(menu);
    }

    @Override
    public void deleteMenu(Integer id) {
        menuMapper.deleteById(id);
    }

    @Override
    public void deletesMenu(List<Integer> ids) {
        menuMapper.deleteBatchIds(ids);
    }

    // 分页查询
    @Override
    public PageInfo<MenuVo> pageSelectMenu(MenuPageParam menuPageParam) {
        // 3. 安全分页设置
        int pageNum = Math.max(menuPageParam.getPageNumber(), 1);
        int pageSize = Math.min(menuPageParam.getPageSize(), 100); // 限制每页最大100条
        LambdaQueryWrapper<Menu> queryWrapper = new LambdaQueryWrapper<>();
//        queryWrapper.eq("")
        return null;
    }



}




