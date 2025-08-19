package com.example.forest.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import com.example.forest.common.ServiceCode;
import com.example.forest.excpetion.BusinessException;
import com.example.forest.model.cache.FireCache;
import com.example.forest.model.persist.entity.FireData;
import com.example.forest.model.persist.param.fire.FireDataPageParam;
import com.example.forest.model.persist.param.fire.FireDataParam;
import com.example.forest.model.persist.vo.fire.FireDataVo;
import com.example.forest.model.persist.vo.screen.Screen;
import com.example.forest.service.FireDataService;
import com.example.forest.mapper.FireDataMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.micrometer.common.util.StringUtils;
import jakarta.annotation.Resource;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

/**
* @author Mr_zh
* @description 针对表【fire_data(火灾报警记录表)】的数据库操作Service实现
* @createDate 2025-08-15 19:16:20
*/
@Service
public class FireDataServiceImpl extends ServiceImpl<FireDataMapper, FireData>
    implements FireDataService{

    @Value("${spring.servlet.multipart.location}")
    private String uploadLocation;

    @Resource
    private FireDataMapper fireDataMapper;

    @Resource
    private FireCache fireCache;

    // 单个查询
    @Override
    public FireDataVo select(Integer id) {
        // 查缓存
        FireDataVo fireDataCache = fireCache.select(id);
        if (fireDataCache != null) {
            return fireDataCache;
        }

        // 查数据库
        FireData fireMapper = fireDataMapper.selectById(id);
        if (fireMapper == null) {
            throw new BusinessException(ServiceCode.FAIL_CODE, "没有查到此数据");
        }

        // 转换为VO
        FireDataVo fireDataVo = new FireDataVo();
        BeanUtils.copyProperties(fireMapper, fireDataVo);

        // 存缓存（存储VO而不是Entity）
        fireCache.set(fireDataVo);  // 修改这里

        return fireDataVo;
    }

    // 新增
    @Override
    public void add(FireDataParam fireDataParam) {
        FireData fireData = new FireData();
        BeanUtils.copyProperties(fireDataParam, fireData);
        fireDataMapper.insert(fireData);
    }

    // 单个删除
    @Override
    public void delete(Integer id) {
        fireDataMapper.deleteById(id);
    }
    // 批量删除
    @Override
    public void deletes(List<Integer> ids) {
        fireDataMapper.deleteBatchIds(ids);
    }

    // 修改接口
    @Override
    public void updateFire(Integer id, FireDataParam fireDataParam) {
        FireData fireData = new FireData();
        fireData.setId(id);
        BeanUtils.copyProperties(fireDataParam, fireData);
        fireDataMapper.updateById(fireData);
    }

    // 分页查询
    @Override
    public PageInfo<FireData> selectPage(FireDataPageParam fireDataPageParam) {
        int pageNum = Math.max(fireDataPageParam.getPageNumber(), 1);
        int pageSize = Math.min(fireDataPageParam.getPageSize(), 100);
        // 条件构建
        QueryWrapper<FireData> queryWrapper = new QueryWrapper<>();
        if (fireDataPageParam.getLongitude() != null) {
            queryWrapper.like("longitude", fireDataPageParam.getLongitude());
        }
        if (fireDataPageParam.getLatitude() != null) {
            queryWrapper.like("latitude", fireDataPageParam.getLatitude());
        }
        if (fireDataPageParam.getAlarmType() != null) {
            queryWrapper.like("alarm_type", fireDataPageParam.getAlarmType());
        }
        // 数值字段应该使用eq或范围查询
        if (fireDataPageParam.getTemperature() != null) {
            queryWrapper.like("temperature", fireDataPageParam.getTemperature());
        }
        if (fireDataPageParam.getSmokeDensity() != null) {
            queryWrapper.like("smoke_density", fireDataPageParam.getSmokeDensity());
        }
        if (fireDataPageParam.getStatus() != null) {
            queryWrapper.like("status", fireDataPageParam.getStatus());
        }
        if (StringUtils.isNotBlank(fireDataPageParam.getCreateName())) {
            queryWrapper.like("create_name", fireDataPageParam.getCreateName());
        }

        PageHelper.startPage(pageNum, pageSize);
        List<FireData> fireData = fireDataMapper.selectList(queryWrapper);
        return new PageInfo<>(fireData);
    }

    // 上传图片接口
    @Override
    public String upload(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new BusinessException(ServiceCode.FAIL_CODE, "文件为空，请重新选择");
            }
            // 获取原始文件名
            String originalName = file.getOriginalFilename();
            if (originalName == null || !originalName.contains(".")) {
                throw new BusinessException(ServiceCode.FAIL_CODE, "上传图片格式错误，请重新选择");
            }

            // 处理文件名
            String prefix = originalName.substring(0, originalName.lastIndexOf('.'));
            String suffix = originalName.substring(originalName.lastIndexOf('.'));
            String fileName = prefix + "_" + System.currentTimeMillis() + suffix;

            // 创建保存目录（建议使用配置的路径而非资源路径）
            File dir = new File(uploadLocation);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            // 保存文件
            File destFile = new File(dir, fileName);
            file.transferTo(destFile);

            // 返回相对路径（根据实际需求调整）
            String relativePath = "static/img/" + fileName;
            return relativePath;
        } catch (IOException e) {
            throw new BusinessException(ServiceCode.FAIL_CODE, "文件上传失败: " + e.getMessage());
        }
    }

    @Override
    public Screen dataSelect() {
        return fireDataMapper.dataSelect();
    }
}




