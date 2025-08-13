create database forest;

use forest;
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission`  (
                               `permission_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '权限ID',
                               `permission_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '权限名称',
                               `permission_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '权限代码',
                               `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '权限描述',
                               `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                               PRIMARY KEY (`permission_id`) USING BTREE,
                               UNIQUE INDEX `permission_name`(`permission_name`) USING BTREE,
                               UNIQUE INDEX `permission_code`(`permission_code`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '系统权限表' ROW_FORMAT = Dynamic;

INSERT INTO `permission` VALUES (1, '系统模块:角色功能:新增操作', 'system_role_insert', '角色插入操作', '2025-06-29 01:37:35');
INSERT INTO `permission` VALUES (2, '系统模块:角色功能:删除操作', 'system_role_delete', '角色删除操作', '2025-06-29 01:37:32');
INSERT INTO `permission` VALUES (3, '系统模块:角色功能:更新操作', 'system_role_update', '角色更新操作', '2025-06-29 01:37:28');
INSERT INTO `permission` VALUES (4, '系统模块:角色功能:查找操作', 'system_role_select', '角色查询操作', '2025-06-29 01:37:31');
INSERT INTO `permission` VALUES (5, '系统模块:角色功能:查询列表操作', 'system_role_list', '角色查询列表', '2025-06-29 01:37:26');
INSERT INTO `permission` VALUES (6, '系统模块:角色功能:批量删除列表操作', 'system_role_deletes', '角色批量删除', '2025-06-27 06:51:02');
INSERT INTO `permission` VALUES (7, '系统模块:角色功能:查询全部角色', 'system_role_selects', '角色查询全部', '2025-06-29 01:37:23');
INSERT INTO `permission` VALUES (8, '系统模块:用户功能:新增操作', 'system_user_insert', '用户插入操作', '2025-06-29 01:37:35');
INSERT INTO `permission` VALUES (9, '系统模块:用户功能:删除操作', 'system_user_delete', '用户删除操作', '2025-06-29 01:37:32');
INSERT INTO `permission` VALUES (10, '系统模块:用户功能:更新操作', 'system_user_update', '用户更新操作', '2025-06-29 01:37:28');
INSERT INTO `permission` VALUES (11, '系统模块:用户功能:查找操作', 'system_user_select', '用户查询操作', '2025-06-29 01:37:31');
INSERT INTO `permission` VALUES (12, '系统模块:用户功能:查询列表操作', 'system_user_list', '用户查询列表', '2025-06-29 01:37:26');
INSERT INTO `permission` VALUES (13, '系统模块:用户功能:批量删除列表操作', 'system_user_deletes', '用户批量删除', '2025-06-27 06:51:02');
INSERT INTO `permission` VALUES (14, '系统模块:用户功能:查询全部角色', 'system_user_selects', '用户查询全部', '2025-06-29 01:37:23');
INSERT INTO `permission` VALUES (15, '系统模块:班级功能:新增操作', 'system_class_insert', '班级插入操作', '2025-06-29 01:37:35');
INSERT INTO `permission` VALUES (16, '系统模块:班级功能:删除操作', 'system_class_delete', '班级删除操作', '2025-06-29 01:37:32');
INSERT INTO `permission` VALUES (17, '系统模块:班级功能:更新操作', 'system_class_update', '班级更新操作', '2025-06-29 01:37:28');
INSERT INTO `permission` VALUES (18, '系统模块:班级功能:查找操作', 'system_class_select', '班级查询操作', '2025-06-29 01:37:31');
INSERT INTO `permission` VALUES (19, '系统模块:班级功能:查询列表操作', 'system_class_list', '班级查询列表', '2025-06-29 01:37:26');
INSERT INTO `permission` VALUES (20, '系统模块:班级功能:批量删除列表操作', 'system_class_deletes', '班级批量删除', '2025-06-27 06:51:02');
INSERT INTO `permission` VALUES (21, '系统模块:班级功能:查询全部角色', 'system_class_selects', '班级查询全部', '2025-06-29 01:37:23');


DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
                         `role_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色ID',
                         `role_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '角色名称',
                         `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '角色描述',
                         `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                         PRIMARY KEY (`role_id`) USING BTREE,
                         UNIQUE INDEX `role_name`(`role_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '系统角色表' ROW_FORMAT = Dynamic;


INSERT INTO `role` VALUES (1, '超级管理员', '拥有全部权限', NULL);
INSERT INTO `role` VALUES (2, '老师', '拥有部分权限', NULL);
INSERT INTO `role` VALUES (3, '学生', '只有一少部分权限', '2025-06-29 08:46:19');
INSERT INTO `role` VALUES (4, '访客', '无任何权限', '2025-07-09 20:17:58');


DROP TABLE IF EXISTS `role_permission`;
CREATE TABLE `role_permission`  (
                                    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '关联ID',
                                    `role_id` int(11) NOT NULL COMMENT '角色ID',
                                    `permission_id` int(11) NOT NULL COMMENT '权限ID',
                                    `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                                    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '角色权限关联表' ROW_FORMAT = Dynamic;

INSERT INTO `role_permission` VALUES (1, 2, 5, NULL);
INSERT INTO `role_permission` VALUES (2, 1, 1, NULL);
INSERT INTO `role_permission` VALUES (3, 1, 2, NULL);
INSERT INTO `role_permission` VALUES (4, 1, 3, NULL);
INSERT INTO `role_permission` VALUES (5, 1, 4, NULL);
INSERT INTO `role_permission` VALUES (6, 1, 5, NULL);
INSERT INTO `role_permission` VALUES (7, 1, 6, NULL);
INSERT INTO `role_permission` VALUES (8, 1, 7, NULL);
INSERT INTO `role_permission` VALUES (9, 1, 8, NULL);
INSERT INTO `role_permission` VALUES (10, 1, 9, NULL);
INSERT INTO `role_permission` VALUES (11, 1, 10, NULL);
INSERT INTO `role_permission` VALUES (12, 1, 11, NULL);
INSERT INTO `role_permission` VALUES (13, 1, 12, NULL);
INSERT INTO `role_permission` VALUES (14, 1, 13, NULL);
INSERT INTO `role_permission` VALUES (15, 1, 14, NULL);
INSERT INTO `role_permission` VALUES (16, 1, 15, NULL);
INSERT INTO `role_permission` VALUES (17, 1, 16, NULL);
INSERT INTO `role_permission` VALUES (18, 1, 17, NULL);
INSERT INTO `role_permission` VALUES (19, 1, 18, NULL);
INSERT INTO `role_permission` VALUES (20, 1, 19, NULL);
INSERT INTO `role_permission` VALUES (21, 1, 20, NULL);
INSERT INTO `role_permission` VALUES (22, 1, 21, NULL);


DROP TABLE IF EXISTS `system_user`;
CREATE TABLE `system_user`  (
                                `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
                                `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名',
                                `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '密码(加密存储)',
                                `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '电子邮箱',
                                `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '手机号码',
                                `status` tinyint(4) NULL DEFAULT 1 COMMENT '状态(0-禁用,1-启用)',
                                `last_login_time` datetime NULL DEFAULT NULL COMMENT '最后登录时间',
                                `last_login_ip` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '最后登录IP',
                                `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                                `update_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
                                PRIMARY KEY (`user_id`) USING BTREE,
                                UNIQUE INDEX `username`(`username`) USING BTREE,
                                UNIQUE INDEX `email`(`email`) USING BTREE,
                                UNIQUE INDEX `phone`(`phone`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '系统用户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of system_user
-- ----------------------------
INSERT INTO `system_user` VALUES (1, 'admin', '$2a$10$5lIPiCDGcm5jsLAD7FZ5N.mOOrseghN3Q2TJvzNlg7l5d2fqLoQRa', 1, '2783580032@qq.com', '14740178387', 0, NULL, '0:0:0:0:0:0:0:1', '2025-06-28 14:00:17', '2025-07-09 09:34:06');
INSERT INTO `system_user` VALUES (3, '12123', '$2a$10$m3suyQPpxvzxjQIGrAlMZuakPQmPxIOrJkN6Zpfa8Hg/tf0tJ2fMm', 3, '123@163.com', '147401782387', 0, NULL, '0:0:0:0:0:0:0:1', '2025-06-26 18:07:28', '2025-07-11 08:25:17');
INSERT INTO `system_user` VALUES (2, '李梦茹', '$2a$10$5lIPiCDGcm5jsLAD7FZ5N.mOOrseghN3Q2TJvzNlg7l5d2fqLoQRa', 1, '27835800323@qq.com', '147340178387', 0, NULL, '0:0:0:0:0:0:0:1', '2025-06-28 14:00:17', '2025-07-09 09:34:06');


DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role`  (
                              `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '关联ID',
                              `user_id` int(11) NOT NULL COMMENT '用户ID',
                              `role_id` int(11) NOT NULL COMMENT '角色ID',
                              `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                              PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户角色关联表' ROW_FORMAT = Dynamic;


INSERT INTO `user_role` VALUES (1, 1, 1, '2025-07-10 16:23:46');



CREATE TABLE `menu` (
                        `id` bigint NOT NULL AUTO_INCREMENT,
                        `parent_id` bigint DEFAULT NULL COMMENT '父菜单ID',
                        `name` varchar(50) NOT NULL COMMENT '菜单名称',
                        `path` varchar(200) DEFAULT NULL COMMENT '前端路由路径',
                        `component` varchar(200) DEFAULT NULL COMMENT '前端组件路径',
                        `title` varchar(50) DEFAULT NULL COMMENT '菜单标题',
                        `icon` varchar(50) DEFAULT NULL COMMENT '菜单图标',
                        `sort` int DEFAULT '0' COMMENT '排序',
                        `hidden` tinyint(1) DEFAULT '0' COMMENT '是否隐藏',
                        `always_show` tinyint(1) DEFAULT '0' COMMENT '是否总是显示',
                        `redirect` varchar(200) DEFAULT NULL COMMENT '重定向路径',
                        `meta` json DEFAULT NULL COMMENT '元数据',
                        PRIMARY KEY (`id`),
                        KEY `parent_id` (`parent_id`)
);



CREATE TABLE `role_menu` (
                             `role_id` bigint NOT NULL,
                             `menu_id` bigint NOT NULL,
                             PRIMARY KEY (`role_id`,`menu_id`),
                             KEY `menu_id` (`menu_id`)

);


CREATE TABLE tree_species (
                              id INT PRIMARY KEY AUTO_INCREMENT COMMENT '编号',
                              attachment_name VARCHAR(50) NOT NULL COMMENT '树种名称',
                              scientific_name VARCHAR(100) NOT NULL COMMENT '学名',
                              family VARCHAR(50) NOT NULL COMMENT '所属科',
                              protection_level VARCHAR(20) COMMENT '保护级别',
                              height DECIMAL(5,2) COMMENT '高度(m)',
                              diameter DECIMAL(5,2) COMMENT '直径(cm)',
                              lifespan INT COMMENT '寿命(年)',
                              growth_environment VARCHAR(255) COMMENT '生长环境',
                              uses TEXT COMMENT '用途'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='树种信息表';

CREATE TABLE region_area (
                             id INT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
                             region_name VARCHAR(100) NOT NULL COMMENT '区域名称',
                             sequence varchar(10) not null comment '顺序',
                             area_hectares DECIMAL(12,2) NOT NULL COMMENT '面积(公顷)',
                             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                             updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='区域面积表';

CREATE TABLE region_monitoring (
                                   id INT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
                                   region_name VARCHAR(100) NOT NULL COMMENT '区域名称',
                                   br_code VARCHAR(50) COMMENT 'BR编码/标识',
                                   anomaly_type VARCHAR(50) NOT NULL COMMENT '异常类型',
                                   critical_value VARCHAR(50) NOT NULL COMMENT '危急值',
                                   creator VARCHAR(50) NOT NULL COMMENT '创建者',
                                   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                                   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='区域监测异常表';


CREATE TABLE azimuth_data (
                              id INT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
                              azimuth_value DECIMAL(10,6) NOT NULL COMMENT '方位角数据(十进制度数)',
                              image_path VARCHAR(255) COMMENT '图片存储路径',
                              image_metadata JSON COMMENT '图片元数据(尺寸、格式等)',
                              creator VARCHAR(50) NOT NULL COMMENT '创建者',
                              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
                              INDEX idx_azimuth (azimuth_value) COMMENT '方位角索引'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='方位角数据记录表';

SELECT
    u.user_id,u.username,u.password,u.email,
    u.phone,u.status,u.last_login_time,u.last_login_ip,u.create_time,
    u.update_time,
    p.permission_code
FROM system_user u
         LEFT JOIN user_role ur on ur.user_id = u.user_id
         LEFT JOIN role_permission rp on rp.role_id = ur.role_id
         LEFT JOIN permission p on p.permission_id = rp.permission_id
WHERE u.phone = 14740178387