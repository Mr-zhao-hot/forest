package com.example.forest.controller;

import com.example.forest.common.JsonOk;
import com.example.forest.model.persist.vo.menu.MenuVo;
import com.example.forest.service.MenuService;
import jakarta.annotation.Resource;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.Serializable;
import java.util.List;


@RestController
@RequestMapping("/menu")
public class MenuController  {

    @Resource
    private MenuService menuService;

    // 查询菜单
    @GetMapping("/selectMenu/{id}")
    @PreAuthorize("hasAuthority('system_role_select')")
    @Cacheable(value = "selectMenu" , key = "'selectMenu'")
    public JsonOk<MenuVo> selectMenu(@PathVariable Integer id) {
        return JsonOk.success(menuService.selectMenuById(id));
    }

    // 查询全部菜单
    @GetMapping("/selectAllMenu")
    @Cacheable(value = "selectAllMenu", key = "'selectAllMenu'")
    public JsonOk<List<MenuVo>> selectAllMenu() {
        return JsonOk.success(menuService.selectAllMenu());
    }


    // 新增菜单

    // 修改菜单

    // 删除菜单

    // 分页查询菜单


}
