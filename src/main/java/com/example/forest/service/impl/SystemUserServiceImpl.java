package com.example.forest.service.impl;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.forest.common.ServiceCode;
import com.example.forest.excpetion.BusinessException;
import com.example.forest.mapper.SystemUserMapper;
import com.example.forest.mapper.UserRoleMapper;
import com.example.forest.model.cache.impl.SystemUserCacheImpl;
import com.example.forest.model.persist.entity.SystemUser;
import com.example.forest.model.persist.param.systemuser.SystemUserRegisterParam;
import com.example.forest.model.persist.po.systemuserpo.SystemUserLoginPo;
import com.example.forest.model.persist.vo.systemuser.SystemUserLoginInfoVo;
import com.example.forest.model.persist.vo.systemuser.SystemUserVo;
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

    @Override
    public SystemUserVo login(String phone, String password, String remoteAddr, String again) {
        // 参数验证
        if (StringUtils.isEmpty(phone) || StringUtils.isEmpty(password)) {
            throw new BusinessException(ServiceCode.FAIL_CODE,"账号和密码不能为空");
        }

        // 先查缓存
        SystemUserVo cachedUser = systemUserCacheImpl.selectLoginInfo();
        if (cachedUser != null) {
            return cachedUser;
        }

        // 数据库查询
        SystemUserLoginInfoVo loginInfo = systemUserMapper.selectLoginInfo(phone);
        if (loginInfo == null || !passwordEncoder.matches(password, loginInfo.getPassword())) {
            throw new BusinessException(ServiceCode.FAIL_CODE, "用户名或密码错误");
        }

        // 构建返回对象
        SystemUserVo result = new SystemUserVo();
        BeanUtils.copyProperties(loginInfo, result);
        result.setLastLoginIp(remoteAddr);
        result.setToken(buildJwtToken(phone));

        // 缓存用户信息
        systemUserCacheImpl.setLoginInfo(result);

        // 缓存权限信息
        SystemUserLoginPo permissionInfo = new SystemUserLoginPo();
        permissionInfo.setRemoteAddr(remoteAddr);
        permissionInfo.setAgain(again);
        permissionInfo.setPermissionCodeList(loginInfo.getPermissionCodeList());
        systemUserCacheImpl.setLoginPermissionInfo(result.getToken(), permissionInfo);

        return result;
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




