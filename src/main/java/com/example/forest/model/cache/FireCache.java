package com.example.forest.model.cache;

import com.example.forest.model.persist.vo.fire.FireDataVo;

public interface FireCache {
    FireDataVo select(Integer id);

    void set(FireDataVo fireMapper);
}
