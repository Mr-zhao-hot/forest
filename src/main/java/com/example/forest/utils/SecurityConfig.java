package com.example.forest.utils;

import com.alibaba.fastjson.JSON;

import com.example.forest.Filter.JwtAuthenticationFilter;
import com.example.forest.common.JsonOk;
import com.example.forest.common.ServiceCode;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Slf4j
public class SecurityConfig {

    @Resource
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // 白名单（无需认证的接口）
        String[] permitUrls = {
                "/user/systemlogin",
                "/user/register",
                "/role/selects",
                "/swagger-ui/**",
                "/v3/api-docs/**",
                "/fire/upload",
                "/static/img/**",
                "/img/**"

        };

        http
                // 禁用 CSRF（因为使用 JWT，不需要 CSRF 保护）
                .csrf(csrf -> csrf.disable())

                // 配置 CORS（跨域资源共享）
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // 授权规则
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()  // 放行预检请求（OPTIONS）
                        .requestMatchers(permitUrls).permitAll()                 // 白名单接口
                        .anyRequest().authenticated()                           // 其他接口需要认证
                )

                // 添加 JWT 过滤器
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)

                // 禁用默认的登录和注销
                .formLogin(form -> form.disable())
                .logout(logout -> logout.disable())

                // 异常处理（401 未授权 / 403 禁止访问）
                .exceptionHandling(exceptions -> exceptions
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.setContentType("application/json;charset=UTF-8");
                            response.setStatus(HttpStatus.UNAUTHORIZED.value());
                            response.getWriter().write(JSON.toJSONString(
                                    JsonOk.error("请先登录", ServiceCode.FAIL_CODE)
                            ));
                        })
                        .accessDeniedHandler((request, response, accessDeniedException) -> {
                            response.setContentType("application/json;charset=UTF-8");
                            response.setStatus(HttpStatus.FORBIDDEN.value());
                            response.getWriter().write(JSON.toJSONString(
                                    JsonOk.error("权限不足", ServiceCode.FAIL_CODE)
                            ));
                        })
                );

        return http.build();
    }

    /**
     * CORS 配置（允许跨域）
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // 允许的前端地址（替换为你的实际前端地址）
        config.setAllowedOrigins(List.of(
                "http://192.168.251.53:5174", // 前端 IP 地址
                "http://localhost:5174"       // 本地开发地址
        ));

        // 允许的 HTTP 方法
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        // Content-Type 头（文件上传必须）
        config.addExposedHeader("Content-Type");
        // 允许的请求头
        config.setAllowedHeaders(List.of("*"));

        // 允许携带 Cookie（如果前端需要）
        config.setAllowCredentials(true);

        // 预检请求缓存时间（秒）
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config); // 对所有接口生效
        return source;
    }
}