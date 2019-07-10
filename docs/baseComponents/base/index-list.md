# index-list
##### [demo原始链接](http://172.17.16.112:8888/examples/#/indexList) | [demo源码](http://172.16.0.245:2345/Finance_H5/H5_hyapp-ui/blob/develop/examples/routers/indexList.vue) | [组件源码](http://172.16.0.245:2345/Finance_H5/H5_hyapp-ui/tree/develop/src/packages/index-list)
---

## 安装
局部注册
```js{1,5}
import { IndexList } from 'hyapp-ui';

export default {
  components: {
    IndexList
  }
}
```

## 属性

| 属性 | 类型 | 默认值 | 说明 | 版本要求 |
| --- | --- | --- | --- | --- |
| data | `Array` | [] | 列表数据 | |
| probeType | `Number` | 3 | 是否派发scroll事件https://www.cnblogs.com/yi0921/p/7206549.html | |
| listenScroll | `Boolean` | true | 是否监听滚动事件 | |
## 插槽

| 名字 | 说明 | 版本要求 |
| --- | --- | --- |
| 默认插槽 | 列表 | -- |
## 使用

### VUE
```vue
<!-- 引入组件 -->
<index-list :data="items" ref="list">
  <ul>
    <li v-for="group in items" class="list-group" ref="listGroup">
      <h2 class="list-group-title">{{group.title}}</h2>
      <uL>
        <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item">
        <span class="name">{{item.name}}</span>
        </li>
      </uL>
    </li>
  </ul>
</index-list>
```
JS
```js
const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'
export default {
    data() {
        return {
            items: []
        }
    },
    created() {
        this._getSingerList()
    },
    methods: {
        // 选中一项
        selectItem(item) {
            console.log(item)
        },
        _getSingerList() {
            setTimeout(() => {
                this.items = this._normalizeItems([
                    {
                        "Farea": "1",
                        "Findex": "X",
                        "Fsinger_id": "5062",
                        "Fsinger_name": "薛之谦",
                        "Fsinger_tag": "541,555",
                        "Fsort": "1",
                        "Ftrend": "0",
                        "Ftype": "0",
                    }, {
                        "Farea": "0",
                        "Findex": "Z",
                        "Fsinger_id": "4558",
                        "Fsinger_name": "周杰伦",
                        "Fsinger_tag": "541,555",
                        "Fsort": "2",
                        "Ftrend": "0",
                        "Ftype": "0",
                    }])
            }, 1000)
        },
        _normalizeItems(list) {
            let map = {
                hot: {
                    title: HOT_NAME,
                    items: []
                }
            }
            list.forEach((item, index) => {
                if (index < HOT_SINGER_LEN) {
                    map.hot.items.push({
                        name: item.Fsinger_name,
                        id: item.Fsinger_mid
                    })
                }
                const key = item.Findex
                if (!map[key]) {
                    map[key] = {
                        title: key,
                        items: []
                    }
                }
                map[key].items.push({
                    name: item.Fsinger_name,
                    id: item.Fsinger_mid
                })
            })
            // 为了得到有序列表，我们需要处理 map
            let ret = []
            let hot = []
            for (let key in map) {
                let val = map[key]
                if (val.title.match(/[a-zA-Z]/)) {
                    ret.push(val)
                } else if (val.title === HOT_NAME) {
                    hot.push(val)
                }
            }
            ret.sort((a, b) => {
                return a.title.charCodeAt(0) - b.title.charCode(0)
            })
            return hot.concat(ret)
        }
    }
  }
```

CSS
```css
.singer{
    position: absolute;
    width: 100%;
    top: 54px;
    left: 0;
    bottom: 0;
}
nav.title{
    height: 44px;
    width: 100%;
    background-color: #ffffff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
}
.list-group-title{
    background-color: #efefef;
    padding-left: 10px;
}
.list-group-item{
    background-color: #ffffff;
    height: 48px;
    line-height: 48px;
    padding-left: 10px;
    position: relative;
}
.list-group-item:after{
    content: ' ';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    background-color: #eee;
    width: 100%;
    -webkit-transform: rotateY(0.5);
    transform: scaleY(0.5);
}
```