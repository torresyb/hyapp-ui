<template>
    <div class="contain">
        <nav>js Components</nav>
        <div class="group">
            <ul>
                <li>
                    <router-link to="/button">Button</router-link>
                </li>
                <li>
                    <router-link to="/scroll">Scroll</router-link>
                </li>
                <li>
                    <router-link to="/indexlist">IndexList</router-link>
                </li>
                <li>
                    <router-link to="/pulldown">pullDown</router-link>
                </li>
                <li>
                    <router-link to="/cell">Cell</router-link>
                </li>
                <li>
                    <router-link to="/confirm">Confrim</router-link>
                </li>
                <li>
                    <router-link to="/action-sheet">actionSheet</router-link>
                </li>
                <li>
                    <router-link to="/popup">popup</router-link>
                </li>
                <li>
                    <router-link to="/date-picker">date-picker</router-link>
                </li>
                 <li>
                    <router-link to="/picker">picker</router-link>
                </li>
                 <li>
                    <router-link to="/swiper">swiper</router-link>
                </li>
                <li>
                    <router-link to="/address">address</router-link>
                </li>
                 <li>
                    <router-link to="/scratch-card">scratch-card</router-link>
                </li>
                 <li>
                    <router-link to="/textarea">textarea</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="less" scoped>
.contain {
  nav {
    font-size: 20px;
    margin: 20px auto;
    text-align: center;
    display: block;
    line-height: 1;
  }
  .group {
    background-color: #ffffff;
    li {
      box-sizing: border-box;
      color: inherit;
      height: 48px;
      line-height: 48px;
      display: block;
      overflow: hidden;
      position: relative;
      text-decoration: none;
      border-bottom: 1px solid #eee;
      a {
        display: block;
        padding-left: 15px;
      }
    }
  }
}
</style>
