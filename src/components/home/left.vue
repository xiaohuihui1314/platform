<template>
  <div class="left-wrap">
    <Menu theme="dark" class="left-menu" active-name="01">
      <h1 class="banner">Banner</h1>
      <Submenu :name="index" v-for="(menu,index) in menuList">
        <template slot="title">
          <Icon :type="menu.icon"></Icon>
          {{menu.name}}
        </template>
        <router-link :to="{path:menuItem.url}" v-for="(menuItem,index1) in menu.children">
          <Menu-item :name="''+index+index1">
            {{menuItem.name}}
          </Menu-item>
        </router-link>
      </Submenu>
    </Menu>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../assets/style/home/left.scss";
</style>
<script>
  export default{
    data(){
      return {
        menuList: [
          {
            name: "个人中心",
            icon:"person",
            children: [
              {
                name: "用户详情",
                url: "users"
              },
              {
                name: "朋友圈",
                url: "friends"
              },
              {
                name: "我的收藏",
                url: "collection"

              },
              {
                name: "我的留言板",
                url: "messageBoard"
              },
              {
                name: "个人主题",
                url: "theme"
              }
            ]
          },
          {
            name: "CMS",
            icon:"easel",
            children: [
              {
                name: "广告位管理",
                url: "adPosition"
              },
              {
                name: "广告管理",
                url: "advert"
              },
              {
                name: "导航菜单",
                url: "menu"
              },
              {
                name: "分类导航菜单",
                url: "cMenu"
              },
              {
                name: "帮助中心",
                url: "help"
              }
            ]
          }
        ]
      }
    }
  }
</script>
