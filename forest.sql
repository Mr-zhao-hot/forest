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


DROP TABLE IF EXISTS `menu`;
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
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户角色关联表' ROW_FORMAT = Dynamic;

-- 清空表（测试用）
TRUNCATE TABLE `menu`;

-- 插入顶级菜单
INSERT INTO `menu` (`id`, `parent_id`, `name`, `path`, `component`, `title`, `icon`, `sort`, `hidden`, `always_show`, `redirect`, `meta`) VALUES
                                                                                                                                              (1, NULL, 'Dashboard', '/dashboard', 'Layout', '控制台', 'dashboard', 1, 0, 1, '/dashboard/index', '{"title": "控制台", "icon": "dashboard"}'),
                                                                                                                                              (13, NULL, 'Log', '/log', 'Layout', '日志管理', 'log', 6, 0, 0, '/log/login', '{"title": "日志管理"}'),
                                                                                                                                              (14, 13, 'LoginLog', 'login', 'monitor/log/login', '登录日志', 'logininfor', 1, 0, 0, NULL, '{"title": "登录日志"}'),
                                                                                                                                              (15, 13, 'OperLog', 'oper', 'monitor/log/oper', '操作日志', 'operation', 2, 0, 0, NULL, '{"title": "操作日志"}'),

-- 功能示例（无页面菜单）
                                                                                                                                              (16, 5, 'MenuAdd', NULL, NULL, '菜单新增', 'add', 1, 0, 0, NULL, '{"title": "菜单新增", "noCache": true, "action": "add"}');


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
INSERT INTO tree_species (attachment_name, scientific_name, family, protection_level, height, diameter, lifespan, growth_environment, uses) VALUES
('银杏', 'Ginkgo biloba', '银杏科', '国家一级', 40.00, 400.00, 3000, '喜光，耐寒，适应性强，适宜深厚肥沃的土壤', '药用、观赏、木材、食用'),
('水杉', 'Metasequoia glyptostroboides', '杉科', '国家一级', 35.00, 250.00, 600, '湿润气候，喜水湿，耐寒，适宜河岸、低湿地', '观赏、木材、生态修复'),
('珙桐', 'Davidia involucrata', '蓝果树科', '国家一级', 20.00, 100.00, 100, '湿润凉爽气候，喜阴湿，适宜海拔1000-2000米山区', '观赏、科研'),
('红豆杉', 'Taxus chinensis', '红豆杉科', '国家一级', 30.00, 100.00, 5000, '阴湿环境，耐寒，适宜海拔1000-1500米山地', '药用、观赏、木材'),
('樟树', 'Cinnamomum camphora', '樟科', '国家二级', 30.00, 300.00, 1000, '温暖湿润气候，喜光，适宜深厚肥沃土壤', '木材、药用、香料'),
('楠木', 'Phoebe zhennan', '樟科', '国家二级', 30.00, 150.00, 500, '温暖湿润气候，喜阴湿，适宜海拔1000米以下山地', '高档家具、建筑'),
('马尾松', 'Pinus massoniana', '松科', NULL, 45.00, 100.00, 150, '耐干旱瘠薄，适应性强，喜酸性土壤', '木材、造纸、松脂'),
('毛白杨', 'Populus tomentosa', '杨柳科', NULL, 30.00, 100.00, 50, '适应性强，耐寒耐旱，适宜平原地区', '木材、防护林、造纸'),
('槐树', 'Sophora japonica', '豆科', NULL, 25.00, 150.00, 300, '耐旱耐寒，适应性强，喜光', '木材、药用、蜜源'),
('梧桐', 'Firmiana simplex', '梧桐科', NULL, 16.00, 80.00, 100, '喜光，耐旱，适宜温暖气候', '观赏、木材'),
('油松', 'Pinus tabuliformis', '松科', NULL, 25.00, 80.00, 200, '耐寒耐旱，适应性强，喜光', '木材、造林、观赏'),
('白桦', 'Betula platyphylla', '桦木科', NULL, 27.00, 50.00, 80, '耐寒，喜光，适宜湿润土壤', '木材、造纸、观赏'),
('橡树', 'Quercus robur', '壳斗科', NULL, 35.00, 200.00, 500, '耐寒耐旱，适应性强，喜深厚土壤', '木材、酿酒、生态'),
('枫树', 'Acer palmatum', '槭树科', NULL, 15.00, 60.00, 100, '喜阴湿，耐寒，适宜温带气候', '观赏、木材'),
('柳树', 'Salix babylonica', '杨柳科', NULL, 12.00, 40.00, 50, '喜水湿，耐寒，适应性强', '观赏、编织、生态修复'),
('雪松', 'Cedrus deodara', '松科', NULL, 40.00, 150.00, 300, '喜光，耐寒，适宜高海拔地区', '观赏、木材、香料'),
('紫薇', 'Lagerstroemia indica', '千屈菜科', NULL, 8.00, 30.00, 100, '喜光耐旱，适应性强', '观赏、药用'),
('樱花', 'Prunus serrulata', '蔷薇科', NULL, 10.00, 40.00, 60, '喜光，适宜温带气候', '观赏'),
('榕树', 'Ficus microcarpa', '桑科', NULL, 20.00, 200.00, 200, '喜温暖湿润气候，耐修剪', '观赏、遮荫、生态'),
('椰子树', 'Cocos nucifera', '棕榈科', NULL, 30.00, 50.00, 80, '热带气候，喜阳光充足和海边环境', '食用、纤维、观赏');
CREATE TABLE `region_tree` (
                               `id` bigint PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
                               `parent_id` bigint DEFAULT 0 COMMENT '父节点ID(0表示根节点)',
                               `name` varchar(100) NOT NULL COMMENT '区域名称',
                               `sequence` int NOT NULL COMMENT '显示顺序',
                               `area_hectares` decimal(12,2) NOT NULL COMMENT '面积(公顷)',
                               `level` tinyint NOT NULL COMMENT '节点层级(1工区/2林班/3小班)',
                               `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
                               `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='区域树形表';
INSERT INTO `region_tree`
(`parent_id`, `name`, `sequence`, `area_hectares`, `level`) VALUES
-- 顶级工区
(0, '01工区', 1, 490.00, 1),
(0, '02工区', 2, 300.00, 1),

-- 01工区下的林班
(1, '01林班', 1, 100.00, 2),
(1, '02林班', 2, 100.00, 2),
(1, '03林班', 3, 140.00, 2),

-- 01林班下的小班
(3, '01小班', 1, 10.00, 3),
(3, '02小班', 2, 12.00, 3),
(3, '03小班', 3, 8.00, 3),

-- 02林班下的小班
(4, '04小班', 1, 5.00, 3),
(4, '05小班', 2, 12.00, 3),
(4, '06小班', 3, 7.00, 3),

-- 03林班下的小班
(5, '07小班', 1, 8.00, 3),
(5, '08小班', 2, 10.00, 3),
(5, '09小班', 3, 9.00, 3),

-- 02工区下的林班
(2, '04林班', 1, 80.00, 2),
(2, '05林班', 2, 80.00, 2),

-- 04林班下的小班
(14, '10小班', 1, 9.00, 3),
(14, '11小班', 2, 12.00, 3);
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


CREATE TABLE fire_data (
                           id INT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
                           device_id VARCHAR(50) COMMENT '设备编号',
                           longitude DECIMAL(10, 6) NOT NULL COMMENT '经度',
                           latitude DECIMAL(10, 6) NOT NULL COMMENT '纬度',
                           altitude DECIMAL(10, 2) COMMENT '海拔高度(米)',
                           azimuth DECIMAL(5, 2) COMMENT '方位角(0-360度)',
                           alarm_level TINYINT NOT NULL DEFAULT 1 COMMENT '报警等级(1-5,1最低)',
                           alarm_type TINYINT COMMENT '火灾类型(1:烟雾,2:火焰,3:温度,4:其他)',
                           temperature DECIMAL(5, 2) COMMENT '环境温度(℃)',
                           smoke_density DECIMAL(5, 2) COMMENT '烟雾浓度(%)',
                           image_url VARCHAR(255) COMMENT '图片URL',
                           status TINYINT NOT NULL DEFAULT 0 COMMENT '状态(0:未处理,1:处理中,2:已处理,3:误报)',
                           create_name VARCHAR(50) NOT NULL COMMENT '创建者/上报人',
                           create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                           update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='火灾报警记录表';

INSERT INTO `fire_data` (`device_id`, `longitude`, `latitude`, `altitude`, `azimuth`, `alarm_level`, `alarm_type`, `temperature`, `smoke_density`, `image_url`, `status`, `create_name`) VALUES
                                                                                                                                                                                             ('FD-1001', 116.404269, 39.915378, 45.20, 120.50, 2, 1, 35.60, 15.20, 'http://example.com/images/fire001.jpg', 0, 'sensor_001'),
                                                                                                                                                                                             ('FD-1002', 116.405871, 39.916542, 46.50, 135.75, 3, 2, 78.90, 5.30, 'http://example.com/images/fire002.jpg', 1, 'sensor_002');
CREATE TABLE AREA (
        id INT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
        fire_point VARCHAR(10) comment '起火点',
        rescue_vehicle VARCHAR(10) COMMENT '救援车',
        Inspection_vehicle VARCHAR(10) COMMENT '巡检车',
        fire_truck VARCHAR(10) comment '消防车',
        wrecker VARCHAR(10) comment '清障车',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='定点记录';                                                                                                                                                                         ('FD-1003', 116.403156, 39.914723, 44.80, 90.00, 1, 3, 42.30, 2.10, 'http://example.com/images/fire003.jpg', 2, 'sensor_003'),
('FD-1004', 116.406532, 39.917215, 47.20, 180.25, 4, 2, 125.70, 8.90, 'http://example.com/images/fire004.jpg', 0, 'sensor_004'),
('FD-1005', 116.402348, 39.913987, 43.90, 45.50, 2, 1, 38.20, 12.60, 'http://example.com/images/fire005.jpg', 3, 'sensor_005'),
('FD-1006', 116.407891, 39.918342, 48.50, 270.75, 5, 2, 210.50, 25.80, 'http://example.com/images/fire006.jpg', 1, 'sensor_006'),
('FD-1007', 116.401234, 39.912876, 42.30, 315.20, 3, 3, 65.40, 3.20, 'http://example.com/images/fire007.jpg', 2, 'sensor_007'),
('FD-1008', 116.408765, 39.919543, 49.80, 225.60, 1, 4, 28.90, 1.50, 'http://example.com/images/fire008.jpg', 0, 'sensor_008'),
('FD-1009', 116.400567, 39.911234, 41.20, 150.30, 4, 2, 98.70, 18.40, 'http://example.com/images/fire009.jpg', 1, 'sensor_009'),
('FD-1010', 116.409876, 39.920123, 50.50, 60.90, 2, 1, 36.80, 10.70, 'http://example.com/images/fire010.jpg', 2, 'sensor_010'),
('FD-1011', 116.399876, 39.910345, 40.50, 195.40, 3, 3, 72.30, 4.80, 'http://example.com/images/fire011.jpg', 3, 'sensor_011'),
('FD-1012', 116.410234, 39.921456, 51.20, 30.20, 5, 2, 240.60, 32.10, 'http://example.com/images/fire012.jpg', 0, 'sensor_012'),
('FD-1013', 116.398765, 39.909123, 39.80, 105.70, 1, 1, 32.50, 8.30, 'http://example.com/images/fire013.jpg', 1, 'sensor_013'),
('FD-1014', 116.411345, 39.922567, 52.00, 285.30, 4, 2, 135.20, 22.50, 'http://example.com/images/fire014.jpg', 2, 'sensor_014'),
('FD-1015', 116.397654, 39.908234, 38.20, 75.80, 2, 4, 31.20, 0.90, 'http://example.com/images/fire015.jpg', 0, 'sensor_015');


CREATE TABLE equipment(
                          id INT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
                          equipment_name varchar(50) comment '设备名称',
                          status varchar(10) comment '状态',
                          use_name varchar(20) comment '使用人',
                          remark TEXT COMMENT '备注',
                          create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
                          update_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '设备更新时间'
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='设备登记表';
-- 带更多字段的完整插入示例（以消防车为例）
INSERT INTO equipment (
    equipment_name, status, use_name,
    remark, create_time, update_time
) VALUES
      ('消防车-001', '正常', '张队长',
       '大型水罐消防车，载水量10吨，2022年购入', '2022-05-10 09:00:00', '2023-06-15 14:30:00'),

      ('消防车-002', '正常', '李副队',
       '云梯消防车，最大高度32米，2021年购入', '2021-08-15 10:15:00', '2023-05-20 11:20:00'),

      ('消防车-003', '维修', '王队员',
       '泡沫消防车，发动机故障待修', '2020-11-20 14:00:00', '2023-07-01 16:45:00'),

      ('救援车-001', '正常', '应急小组',
       '重型救援车，配备液压破拆工具组', '2023-02-18 08:30:00', '2023-06-28 09:15:00'),

      ('无人机-001', '正常', '航拍组',
       '大疆M300RTK，配备热成像相机', '2023-04-05 13:20:00', '2023-07-10 10:00:00');

-- 批量插入传感器数据
INSERT INTO equipment (equipment_name, status, use_name, remark) VALUES
     ('温度传感器-01', '正常', '监测组', '安装在东区仓库'),
     ('温度传感器-02', '正常', '监测组', '安装在西区实验室'),
     ('烟雾传感器-01', '正常', '监测组', '大厅主探测器'),
     ('气体传感器-01', '正常', '监测组', '化工厂区专用'),
     ('压力传感器-01', '维修', '技术部', '等待更换零件'),
     ('红外传感器-01', '正常', '监测组', '周界安防系统');


/*关键key*/
create TABLE security_key(
    id INT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID',
    key_name VARCHAR(20) COMMENT '钥匙名字',
    key_password VARCHAR(255) comment '钥匙密令',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
)ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='密钥';

SELECT
    u.user_id,u.username,u.password,u.email,
    u.phone,u.status,u.last_login_time,u.last_login_ip,u.create_time,
    u.update_time,
    p.permission_code
FROM system_user u
         LEFT JOIN user_role ur on ur.user_id = u.user_id
         LEFT JOIN role_permission rp on rp.role_id = ur.role_id
         LEFT JOIN permission p on p.permission_id = rp.permission_id
WHERE u.phone = 14740178387;



-- 查看完整菜单树
SELECT m1.title AS l1, m2.title AS l2, m3.title AS l3
FROM menu m1
         LEFT JOIN menu m2 ON m2.parent_id = m1.id
         LEFT JOIN menu m3 ON m3.parent_id = m2.id
WHERE m1.parent_id IS NULL
ORDER BY m1.sort, m2.sort, m3.sort;

-- 检查隐藏菜单
SELECT * FROM menu WHERE hidden = 1;

-- 检查外链菜单
SELECT * FROM menu WHERE component IS NULL AND path LIKE 'http%';

select  avg(smoke_density)  , max(smoke_density) , min(smoke_density) , count(status != 2) ,count(status = 2)  from fire_data ;
