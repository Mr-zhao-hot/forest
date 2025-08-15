package com.example.forest.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.forest.model.persist.entity.SecurityKey;
import com.example.forest.model.persist.param.sercuritykey.KeyPageParam;
import com.example.forest.model.persist.param.sercuritykey.KeyParam;
import com.example.forest.model.persist.vo.sercuritykey.KeyVo;
import com.example.forest.service.SecurityKeyService;
import com.example.forest.mapper.SecurityKeyMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

/**
* @author Mr_zh
* @description 针对表【security_key(密钥)】的数据库操作Service实现
* @createDate 2025-08-15 11:15:05
*/
@Service
public class SecurityKeyServiceImpl extends ServiceImpl<SecurityKeyMapper, SecurityKey>
    implements SecurityKeyService{

    @Resource
    private SecurityKeyMapper securityKeyMapper;

//    @Resource
//    private PasswordEncoder passwordEncoder;

    // 查询单个
    @Override
    public KeyVo select(Integer id) {
        // 查数数据
        SecurityKey securityKey = securityKeyMapper.selectById(id);
        KeyVo keyVo = new KeyVo();
        BeanUtils.copyProperties(securityKey, keyVo);
        return keyVo;
    }

    // 删除密钥
    @Override
    public void delete(Integer id) {
        securityKeyMapper.deleteById(id);
    }

    // 修改密钥
    @Override
    public void updateKey(KeyParam keyParam , Integer id) {
        SecurityKey securityKey = new SecurityKey();
        securityKey.setId(id);
        BeanUtils.copyProperties(keyParam, securityKey);
        securityKeyMapper.updateById(securityKey);
    }

    // 批量删除
    @Override
    public void deletes(List<Integer> ids) {
        securityKeyMapper.deleteBatchIds(ids);
    }

    // 分页查询
    @Override
    public PageInfo<SecurityKey> selectPage(KeyPageParam keyPageParam) {
        int pageNum = Math.max(keyPageParam.getPageNumber(), 1);
        int pageSize = Math.min(keyPageParam.getPageSize(), 100);
        QueryWrapper<SecurityKey> wrapper = new QueryWrapper<>();
        if (StringUtils.hasText(keyPageParam.getKeyCreateName())) {
            wrapper.like("key_create_name", keyPageParam.getKeyCreateName());
        }
        if (StringUtils.hasText(keyPageParam.getKeyName())) {
            wrapper.like("key_name", keyPageParam.getKeyName());
        }
        PageHelper.startPage(pageNum, pageSize);
        List<SecurityKey> list = securityKeyMapper.selectList(wrapper);
        return new PageInfo<>(list);
    }


    // 新增接口
    @Override
    public void add(KeyParam keyParam) {
        SecurityKey securityKey = new SecurityKey();
//        keyParam.setKeyPassword(passwordEncoder.encode(keyParam.getKeyPassword()));
        BeanUtils.copyProperties(keyParam, securityKey);
        securityKeyMapper.insert(securityKey);
    }


}




