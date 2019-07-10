# scratch-card
##### [demo原始链接](http://172.17.16.112:8888/examples/#/scratch-card) | [demo源码](http://172.16.0.245:2345/Finance_H5/H5_hyapp-ui/blob/develop/examples/routers/scratch-card.vue) | [组件源码](http://172.16.0.245:2345/Finance_H5/H5_hyapp-ui/tree/develop/src/packages/scratch-card)
---
> 最低兼容版本：**2.3.2**

## 安装
局部注册
```js{1,5}
import { HyScratchCard } from 'hyapp-ui';

export default {
  components: {
    HyScratchCard
  }
}
```

## 使用

### VUE
```vue
<!-- 引入组件 -->
<hy-scratch-card :prize="prize" :prizebg="prizebg"></hy-scratch-card>
```
### JS
```js
export default {
    data() {
        return {
            prize:null,
            prizebg:require('../assets/images/prizebg.jpg')
        };
    },
    created(){
        const prizeList= ['100元', '200元', '300元', '400元', '谢谢', '谢谢', '谢谢', '谢谢'];
        this.prize=prizeList[Math.floor(Math.random()*prizeList.length)];
    }
};
```

## 属性

| 属性 | 类型 | 默认值 | 说明 | 版本要求 |
| --- | --- | --- | --- | --- |
| width | String | 300px  | 画布宽 |      |
| height | String | 200px | 画布高 | 
| prize | String | 空 | 奖品信息必传 | 
| prizebg | String | 空 | 奖品背景图 | 
| font | String | bold 25px 黑体 | 奖品信息字体样式 | 
| fontColor | String | red | 奖品信息颜色 | 

## 发布日志
* [V2.3.2](/baseComponents/base/_changelog.html#v2-3-2) 新增刮刮卡组件
