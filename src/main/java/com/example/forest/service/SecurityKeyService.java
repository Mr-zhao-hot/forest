package com.example.forest.service;

import com.example.forest.model.persist.entity.SecurityKey;
import com.baomidou.mybatisplus.extension.service.IService;
import com.example.forest.model.persist.param.sercuritykey.KeyPageParam;
import com.example.forest.model.persist.param.sercuritykey.KeyParam;
import com.example.forest.model.persist.vo.sercuritykey.KeyVo;
import com.github.pagehelper.PageInfo;

import java.util.List;

/**
* @author Mr_zh
* @description 针对表【security_key(密钥)】的数据库操作Service
* @createDate 2025-08-15 11:15:05
*/
public interface SecurityKeyService extends IService<SecurityKey> {

    KeyVo select(Integer id);

    void delete(Integer id);

    void updateKey(KeyParam keyParam , Integer id);

    void deletes(List<Integer> ids);

    PageInfo<SecurityKey> selectPage(KeyPageParam keyPageParam);

    void add(KeyParam keyParam);
}
