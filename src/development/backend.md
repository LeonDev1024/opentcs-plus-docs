# 后端开发文档

## 技术栈

- **Spring Boot 3.x** - 应用框架
- **Spring Security** - 安全认证
- **MyBatis Plus** - 持久层框架
- **MySQL/PostgreSQL** - 数据库
- **Redis** - 缓存和消息队列
- **Maven** - 项目构建工具

## 项目结构

```
opentcs-plus/
├── opentcs-admin/              # 系统启动模块
│   ├── src/main/java/
│   │   └── com/opentcs/admin/
│   │       ├── OpenTCSApplication.java  # 启动类
│   │       └── config/                  # 配置类
│   └── src/main/resources/
│       └── application.yml               # 配置文件
├── opentcs-common/             # 通用模块
│   ├── core/                   # 核心工具
│   ├── exception/              # 异常处理
│   ├── utils/                  # 工具类
│   └── constant/               # 常量定义
├── opentcs-module-system/      # 系统管理模块
├── opentcs-module-map/         # 地图管理模块
├── opentcs-module-vehicles/    # 车辆管理模块
├── opentcs-module-task/        # 任务管理模块
├── opentcs-module-algorithm/   # 算法模块
├── opentcs-module-driver/      # 驱动模块
├── opentcs-module-job/         # Job模块
└── opentcs-module-monitor/     # 监控模块
```

## 开发规范

### 包命名规范

```
com.opentcs.{module}.{layer}
```

示例：
- `com.opentcs.system.controller` - 控制器层
- `com.opentcs.system.service` - 服务层
- `com.opentcs.system.mapper` - 数据访问层
- `com.opentcs.system.entity` - 实体类
- `com.opentcs.system.dto` - 数据传输对象
- `com.opentcs.system.vo` - 视图对象

### 代码规范

1. **类命名**
   - Controller: `XxxController`
   - Service: `XxxService` / `XxxServiceImpl`
   - Mapper: `XxxMapper`
   - Entity: `XxxEntity` 或 `Xxx`
   - DTO: `XxxDTO`
   - VO: `XxxVO`

2. **方法命名**
   - 查询: `getXxx`, `listXxx`, `queryXxx`
   - 新增: `createXxx`, `addXxx`, `saveXxx`
   - 更新: `updateXxx`, `modifyXxx`
   - 删除: `deleteXxx`, `removeXxx`

3. **注释规范**
   - 类和方法必须有 JavaDoc 注释
   - 复杂逻辑需要行内注释

## 核心模块开发

### 1. Controller 层

```java
@RestController
@RequestMapping("/api/system/user")
@Api(tags = "用户管理")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping("/list")
    @ApiOperation("获取用户列表")
    public Result<List<UserVO>> listUsers(@RequestParam(required = false) String keyword) {
        List<UserVO> users = userService.listUsers(keyword);
        return Result.success(users);
    }
    
    @PostMapping("/create")
    @ApiOperation("创建用户")
    public Result<Void> createUser(@RequestBody @Valid UserCreateDTO dto) {
        userService.createUser(dto);
        return Result.success();
    }
}
```

### 2. Service 层

```java
@Service
public class UserServiceImpl implements UserService {
    
    @Autowired
    private UserMapper userMapper;
    
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void createUser(UserCreateDTO dto) {
        // 业务逻辑处理
        User user = new User();
        BeanUtils.copyProperties(dto, user);
        user.setCreateTime(LocalDateTime.now());
        userMapper.insert(user);
    }
    
    @Override
    public List<UserVO> listUsers(String keyword) {
        // 查询逻辑
        List<User> users = userMapper.selectList(
            new LambdaQueryWrapper<User>()
                .like(StringUtils.isNotBlank(keyword), User::getName, keyword)
        );
        return users.stream()
            .map(this::convertToVO)
            .collect(Collectors.toList());
    }
}
```

### 3. Mapper 层

```java
@Mapper
public interface UserMapper extends BaseMapper<User> {
    
    /**
     * 自定义查询方法
     */
    @Select("SELECT * FROM sys_user WHERE status = #{status}")
    List<User> selectByStatus(@Param("status") Integer status);
}
```

### 4. Entity 层

```java
@Data
@TableName("sys_user")
public class User extends BaseEntity {
    
    @TableId(type = IdType.AUTO)
    private Long id;
    
    private String username;
    
    private String password;
    
    private String name;
    
    private String email;
    
    private Integer status;
}
```

## 数据库操作

### MyBatis Plus 使用

```java
// 基本查询
User user = userMapper.selectById(1L);

// 条件查询
List<User> users = userMapper.selectList(
    new LambdaQueryWrapper<User>()
        .eq(User::getStatus, 1)
        .like(User::getName, "张")
        .orderByDesc(User::getCreateTime)
);

// 分页查询
Page<User> page = new Page<>(1, 10);
Page<User> result = userMapper.selectPage(page, 
    new LambdaQueryWrapper<User>().eq(User::getStatus, 1)
);
```

### 事务管理

```java
@Service
@Transactional(rollbackFor = Exception.class)
public class OrderService {
    
    public void createOrder(OrderCreateDTO dto) {
        // 多个数据库操作，保证事务一致性
        orderMapper.insert(order);
        orderItemMapper.insertBatch(items);
        inventoryMapper.updateStock(dto.getItems());
    }
}
```

## 安全认证

### Spring Security 配置

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
```

### JWT Token 使用

```java
@Service
public class AuthService {
    
    public String generateToken(User user) {
        return Jwts.builder()
            .setSubject(user.getUsername())
            .setExpiration(new Date(System.currentTimeMillis() + 86400000))
            .signWith(SignatureAlgorithm.HS512, secret)
            .compact();
    }
}
```

## 异常处理

### 全局异常处理

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(BusinessException.class)
    public Result<Void> handleBusinessException(BusinessException e) {
        return Result.error(e.getCode(), e.getMessage());
    }
    
    @ExceptionHandler(Exception.class)
    public Result<Void> handleException(Exception e) {
        log.error("系统异常", e);
        return Result.error(500, "系统异常，请联系管理员");
    }
}
```

## 接口文档

### Swagger 配置

```java
@Configuration
public class SwaggerConfig {
    
    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("OpenTCS Plus API")
                .version("1.0.0")
                .description("OpenTCS Plus 接口文档")
            );
    }
}
```

访问地址: `http://localhost:8080/swagger-ui.html`

## 日志管理

### Logback 配置

```xml
<!-- logback-spring.xml -->
<configuration>
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
    
    <root level="INFO">
        <appender-ref ref="CONSOLE" />
    </root>
</configuration>
```

## 测试

### 单元测试

```java
@SpringBootTest
class UserServiceTest {
    
    @Autowired
    private UserService userService;
    
    @Test
    void testCreateUser() {
        UserCreateDTO dto = new UserCreateDTO();
        dto.setUsername("test");
        dto.setName("测试用户");
        userService.createUser(dto);
        // 断言验证
    }
}
```

## 部署

### 打包

```bash
mvn clean package -DskipTests
```

### 运行

```bash
java -jar opentcs-admin/target/opentcs-admin.jar
```

## 更多资源

- [Spring Boot 官方文档](https://spring.io/projects/spring-boot)
- [MyBatis Plus 文档](https://baomidou.com/)
- [Spring Security 文档](https://spring.io/projects/spring-security)

