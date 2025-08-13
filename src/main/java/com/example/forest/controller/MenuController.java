package com.example.forest.controller;

import com.example.forest.common.JsonOk;
import com.example.forest.model.persist.param.meau.MenuPageParam;
import com.example.forest.model.persist.param.meau.MenuParam;

import com.example.forest.model.persist.vo.menu.MenuVo;
import com.example.forest.model.persist.vo.menu.RouterVo;
import com.example.forest.service.MenuService;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping("/addMenu")
    @Cacheable(value = "addMenu",key = "'addMenu'")
    public JsonOk<MenuVo> addMenu(@RequestBody MenuParam menuParam) {
        menuService.addMenu(menuParam);
        return JsonOk.success("新增成功");
    }
    // 修改菜单
    @PostMapping("/updateMenu/{id}")
    @Cacheable(value = "updateMenu",key = "'updateMenu'")
    public JsonOk<MenuVo> updateMenu(@RequestBody MenuParam menuParam ,@PathVariable Integer id) {
        menuService.updateMenu(menuParam,id);
        return JsonOk.success("修改成功");
    }

    // 删除菜单
    @PostMapping("/deleteMenu/{id}")
    @Cacheable(value = "deleteMenu",key = "'deleteMenu'")
    public JsonOk<MenuVo> deleteMenu(@PathVariable Integer id) {
        menuService.deleteMenu(id);
        return JsonOk.success("删除成功");
    }

    // 批量删除菜单
    @PostMapping("/deletesMenu")
    public JsonOk<MenuVo> deletesMenu(@RequestBody List<Integer> ids) {
        menuService.deletesMenu(ids);
        return JsonOk.success("删除成功");
    }

    // 分页查 询菜单
    @PostMapping("/page/selectMenu")
    public JsonOk<PageInfo<MenuVo>> pageSelectMenu(@RequestBody MenuPageParam menuPageParam) {
        return JsonOk.success(menuService.pageSelectMenu(menuPageParam));
    }
}
