package com.example.forest.controller;
import com.example.forest.common.JsonOk;
import com.example.forest.model.persist.entity.FireData;
import com.example.forest.model.persist.param.fire.FireDataPageParam;
import com.example.forest.model.persist.param.fire.FireDataParam;
import com.example.forest.model.persist.vo.fire.FireDataVo;
import com.example.forest.model.persist.vo.screen.Screen;
import com.example.forest.service.FireDataService;
import com.github.pagehelper.PageInfo;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/fire")
public class FireDataController {


    @Resource
    private FireDataService fireDataService;

    // 图片上传接口
    @PostMapping("/upload")
    public JsonOk<String> upload(@RequestParam("file") MultipartFile file) {
        String relativePath = fireDataService.upload(file);
        return JsonOk.success("图片上传成功", relativePath);
    }

    // 查到单个数据
    @GetMapping("/select/{id}")
    public JsonOk<FireDataVo> select(@PathVariable Integer id) {
        return JsonOk.success(fireDataService.select(id));
    }

    // 新增数据
    @PostMapping("/add")
    public JsonOk add(@RequestBody FireDataParam fireDataParam) {
        fireDataService.add(fireDataParam);
        return JsonOk.success("新增成功");
    }

    // 删除数据
    @PostMapping("/delete/{id}")
    public JsonOk delete(@PathVariable Integer id) {
        fireDataService.delete(id);
        return JsonOk.success("删除成功");
    }

    // 批量删除
    @PostMapping("/deletes")
    public JsonOk deletes(@RequestBody List<Integer> ids) {
        fireDataService.deletes(ids);
        return JsonOk.success("删除成功");
    }

    // 修改数据
    @PostMapping("/update/{id}")
    public JsonOk update(@PathVariable Integer id, @RequestBody FireDataParam fireDataParam) {
        fireDataService.updateFire(id,fireDataParam);
        return JsonOk.success("修改成功");
    }

    // 分页查询
    @PostMapping("/selectPage")
    public JsonOk<PageInfo<FireData>> selectPage(@RequestBody FireDataPageParam fireDataPageParam) {
        return JsonOk.success(fireDataService.selectPage(fireDataPageParam));
    }

    // 数据大屏 (温度 烟浓度数据)
    @PostMapping("/dataSelect")
    public JsonOk<Screen> dataSelect(){
        return JsonOk.success(fireDataService.dataSelect());
    }
}
