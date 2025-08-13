package com.example.forest.service.impl;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.forest.common.ServiceCode;
import com.example.forest.excpetion.BusinessException;
import com.example.forest.mapper.SystemUserMapper;
import com.example.forest.mapper.UserRoleMapper;
import com.example.forest.model.cache.impl.SystemUserCacheImpl;
import com.example.forest.model.persist.entity.SystemUser;
import com.example.forest.model.persist.param.systemuserparam.SystemUserRegisterParam;
import com.example.forest.model.persist.po.systemuserpo.SystemUserLoginPo;
import com.example.forest.model.persist.vo.systemuservo.SystemUserLoginInfoVo;
import com.example.forest.model.persist.vo.systemuservo.SystemUserVo;
import com.example.forest.service.SystemUserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.Resource;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
* @author Mr_zh
* &#064;description  针对表【system_user(系统用户表)】的数据库操作Service实现
* &#064;createDate  2025-06-25 09:18:46
 */
@Service
public class SystemUserServiceImpl extends ServiceImpl<SystemUserMapper, SystemUser>
    implements SystemUserService {

    @Resource
    private PasswordEncoder passwordEncoder;

    @Value("${secretKey}")
    private String secretKey;

    @Value("${durationInMinute}")
    private Long durationInMinute;

    @Resource
    private SystemUserCacheImpl systemUserCacheImpl;

    @Resource
    private SystemUserMapper systemUserMapper;

    @Resource
    private UserRoleMapper userRoleMapper;

    // 用户登录
    @Override
    public SystemUserVo login(String phone, String password, String remoteAddr, String again) {
        // 判断用户是否输入正确
        if (StringUtils.isEmpty(phone) || StringUtils.isEmpty(password)) {
            throw new BusinessException(ServiceCode.FAIL_CODE,"密码和账号不能为空");
        }

        SystemUserVo systemUserVo = new SystemUserVo();
        // 先查缓存
        SystemUserVo systemUserVo1 = systemUserCacheImpl.selectLoginInfo();
        if (systemUserVo1 != null) {
          BeanUtils.copyProperties(systemUserVo1, systemUserVo);
          return systemUserVo;
        }
        // 登录逻辑
        SystemUserLoginInfoVo loginInfo = systemUserMapper.selectLoginInfo(phone);


        if (!passwordEncoder.matches(password, loginInfo.getPassword())) {
            throw new BusinessException(ServiceCode.FAIL_CODE, "用户名或密码错误");
        }

        // 返回给前端显示数据
        SystemUserVo systemUserVo2 = new SystemUserVo();
        systemUserVo.setLastLoginIp(remoteAddr);
        BeanUtils.copyProperties(loginInfo, systemUserVo2);

        // 传入token
        String token = buildJwtToken(phone);
        systemUserVo.setToken(token);

        // 存入用户登录信息缓存
        BeanUtils.copyProperties(loginInfo, systemUserVo);
        systemUserCacheImpl.setLoginInfo(systemUserVo);


        // 存入缓存 权限信息缓存
        SystemUserLoginPo systemUserLoginPo = new SystemUserLoginPo();
        systemUserLoginPo.setRemoteAddr(remoteAddr);
        systemUserLoginPo.setAgain(again);
        systemUserLoginPo.setPermissionCodeList(loginInfo.getPermissionCodeList());
        systemUserCacheImpl.setLoginPermissionInfo(token, systemUserLoginPo);
        return systemUserVo;
    }



    // 注册用户
    @Transactional
    @Override
    public void register(SystemUserRegisterParam systemUserRegisterParam, String remoteAddr) {
        SystemUser systemUser = new SystemUser();
        systemUser.setUsername(systemUserRegisterParam.getUsername());
        systemUser.setPassword(passwordEncoder.encode(systemUserRegisterParam.getPassword()));
        systemUser.setLastLoginIp(remoteAddr);
        BeanUtils.copyProperties(systemUserRegisterParam, systemUser);
        systemUserMapper.insert(systemUser);
        if (systemUserRegisterParam.getRoleIds() != null) {
            userRoleMapper.insert(systemUser.getUserId(), systemUserRegisterParam.getRoleIds());
        }
    }


    // 设置token
    private String buildJwtToken(String phone) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("phone", phone);
        return Jwts.builder()
                .header()
                .add("alg", "HS256")
                .add("typ", "JWT")
                .and()
                .claims(claims)
                .expiration(new Date(System.currentTimeMillis() + 60L * 1000 * durationInMinute))
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8)))
                .compact();
    }
}




