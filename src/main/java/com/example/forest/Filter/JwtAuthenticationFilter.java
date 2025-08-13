package com.example.forest.Filter;

import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.example.forest.common.JsonOk;
import com.example.forest.common.ServiceCode;
import com.example.forest.model.persist.constant.SystemUserConstant;
import com.example.forest.model.persist.po.systemuserpo.SystemUserLoginPo;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.Resource;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import com.alibaba.fastjson.JSON;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 * JWT认证过滤器，继承自OncePerRequestFilter确保每次请求只过滤一次
 * 用于处理基于JWT的身份验证
 */
@Configuration
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    // Redis模板，用于操作Redis数据库
    @Resource
    private RedisTemplate redisTemplate;

    // 从配置文件中注入JWT的密钥
    @Value("${secretKey}")
    private String secretKey;

    /**
     * 将JSON响应写入HTTP响应流
     * @param response HTTP响应对象
     * @param jsonOk 要返回的JSON对象
     * @throws IOException 如果写入响应时发生I/O错误
     */
    private void writeJsonResponse(HttpServletResponse response, JsonOk jsonOk) throws IOException {
        // 设置响应内容类型为JSON，字符编码为UTF-8
        response.setContentType("application/json;charset=UTF-8");
        // 获取响应输出流
        PrintWriter writer = response.getWriter();
        // 将JSON对象转换为字符串并写入响应
        writer.println(JSON.toJSONString(jsonOk));
        // 关闭输出流
        writer.close();
    }

    /**
     * 过滤器核心方法，处理每个HTTP请求
     * @param request HTTP请求对象
     * @param response HTTP响应对象
     * @param filterChain 过滤器链，用于继续处理请求
     * @throws ServletException 如果处理请求时发生Servlet异常
     * @throws IOException 如果处理请求时发生I/O错误
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // 1. 从请求头中获取Token
        String token = request.getHeader("Authorization");

        // 2. 检查Token是否存在且长度足够（至少113字符）
        if (StringUtils.isEmpty(token) || token.length()<113) {
            // 如果Token不存在或长度不足，直接放行（可能是白名单请求）
            filterChain.doFilter(request, response);
            return;
        }

        // 3. 解析和验证JWT Token
        try {
            // 使用JWT解析器验证Token签名
            Jwts.parser()
                    // 设置验证密钥（从配置文件中获取）
                    .verifyWith(Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8)))
                    .build()
                    // 解析签名后的Token
                    .parseSignedClaims(token)
                    // 获取Token的payload部分
                    .getPayload();
        } catch (ExpiredJwtException e) {
            // Token过期异常处理
            log.warn("JWT已过期: {}", e.getMessage());
            writeJsonResponse(response, JsonOk.error("登录已过期，请重新登录", ServiceCode.FAIL_CODE));
            return;
        } catch (SecurityException | MalformedJwtException e) {
            // Token格式错误或签名验证失败异常处理
            log.warn("无效JWT: {}", e.getMessage());
            writeJsonResponse(response, JsonOk.error("非法Token", ServiceCode.FAIL_CODE));
            return;
        } catch (Exception e) {
            // 其他异常处理
            log.error("JWT处理异常: ", e);
            writeJsonResponse(response, JsonOk.error("认证失败", ServiceCode.FAIL_CODE));
            return;
        }

        // 4. 从Redis查询用户信息
        // 构建Redis键：系统用户前缀 + Token
        String redisKey = SystemUserConstant.SYSTEM_USER + token;
        // 从Redis获取用户登录信息
        SystemUserLoginPo systemUserLoginPo = (SystemUserLoginPo) redisTemplate.opsForValue().get(redisKey);

        // 建议修改为
        if (systemUserLoginPo == null) {
            log.warn("Token有效但Redis中无用户信息: {}", token);
            response.setContentType("application/json;charset=UTF-8");
            response.setStatus(ServiceCode.FAIL_CODE.getCode());
            response.getWriter().write(JSON.toJSONString(
                    JsonOk.error("会话已过期，请重新登录", ServiceCode.UNAUTHORIZED)
            ));
            return;
        }

        // 5. 设置Spring Security认证信息
        // 将用户权限列表转换为Spring Security的GrantedAuthority列表
        List<SimpleGrantedAuthority> authorities = systemUserLoginPo.getPermissionCodeList()
                .stream()
                .map(SimpleGrantedAuthority::new)
                .toList();

        // 创建认证令牌，包含用户主体、凭证和权限列表
        Authentication authentication = new UsernamePasswordAuthenticationToken(
                systemUserLoginPo, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        log.debug("已设置认证信息: {}, 权限: {}",
                authentication.getName(),
                authentication.getAuthorities());

        // 6. 放行请求，继续过滤器链的处理
        filterChain.doFilter(request, response);
    }
}