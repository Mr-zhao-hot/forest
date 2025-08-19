package com.example.forest.service;


import com.baomidou.mybatisplus.extension.service.IService;
import com.example.forest.model.persist.entity.FireData;
import com.example.forest.model.persist.param.fire.FireDataPageParam;
import com.example.forest.model.persist.param.fire.FireDataParam;
import com.example.forest.model.persist.vo.fire.FireDataVo;
import com.example.forest.model.persist.vo.screen.Screen;
import com.github.pagehelper.PageInfo;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
* @author Mr_zh
* @description 针对表【fire_data(火灾报警记录表)】的数据库操作Service
* @createDate 2025-08-15 19:16:20
*/
public interface FireDataService extends IService<FireData> {

    FireDataVo select(Integer id);

    void add(FireDataParam fireDataParam);

    void delete(Integer id);

    void deletes(List<Integer> ids);

    void updateFire(Integer id, FireDataParam fireDataParam);

    PageInfo<FireData> selectPage(FireDataPageParam fireDataPageParam);

    String upload(MultipartFile file);

    Screen dataSelect();
}
