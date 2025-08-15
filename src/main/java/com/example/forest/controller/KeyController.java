package com.example.forest.controller;

import com.example.forest.common.JsonOk;
import com.example.forest.model.persist.entity.SecurityKey;
import com.example.forest.model.persist.param.sercuritykey.KeyPageParam;
import com.example.forest.model.persist.param.sercuritykey.KeyParam;
import com.example.forest.model.persist.vo.sercuritykey.KeyVo;
import com.example.forest.service.SecurityKeyService;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/key")
public class KeyController {

    @Resource
    private SecurityKeyService securityKeyService;

    // 查询单个密钥
    @GetMapping("/select/{id}")
    public JsonOk<KeyVo> select(@PathVariable Integer id) {
        return JsonOk.success(securityKeyService.select(id));
    }

    // 删除密钥
    @PostMapping("/delete/{id}")
    public JsonOk delete(@PathVariable Integer id) {
        securityKeyService.delete(id);
        return JsonOk.success("删除成功");
    }

    // 修改密钥
    @PostMapping("/update/{id}")
    public JsonOk update(@PathVariable Integer id, @RequestBody KeyParam keyParam) {
        securityKeyService.updateKey(keyParam ,id);
        return JsonOk.success("修改成功");
    }

    // 批量删除密钥
    @PostMapping("/deletes")
    public JsonOk deletes(@RequestBody List<Integer> ids) {
        securityKeyService.deletes(ids);
        return JsonOk.success("批量删除成功");
    }

    // 分页查询
    @PostMapping("/selectPage")
    public JsonOk<PageInfo<SecurityKey>> selectPage(@RequestBody KeyPageParam keyPageParam) {
        return JsonOk.success(securityKeyService.selectPage(keyPageParam));
    }

    // 新增密匙
    @PostMapping("/add")
    public JsonOk add(@RequestBody KeyParam keyParam) {
        securityKeyService.add(keyParam);
        return JsonOk.success("新增成功");
    }
}
