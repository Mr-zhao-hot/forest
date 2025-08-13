package com.example.forest.mapper;

import com.example.forest.model.persist.entity.Menu;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.forest.model.persist.vo.menu.MenuVo;

import java.util.List;

/**
* @author Mr_zh
* @description 针对表【menu】的数据库操作Mapper
* @createDate 2025-08-13 13:43:55
* @Entity com.example.forest.model.persist.entity.Menu
*/
public interface MenuMapper extends BaseMapper<Menu> {

    MenuVo SelectMenuById(Integer id);

    List<MenuVo> selectAllMenu();
}




