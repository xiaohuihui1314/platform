<template>
  <div class="left-wrap">
    <Menu theme="dark" class="left-menu"  @on-select="getSubMenuName">
      <h1 class="banner">Banner</h1>
      <Submenu :name="menu.name" v-for="(menu,index) in menuList" key="1" >
        <template slot="title" >
          <Icon :type="menu.icon"></Icon>
          {{menu.name}}
        </template>
        <router-link :to="{path:menuItem.url}"  v-for="(menuItem,index1) in menu.children" key="1">
          <Menu-item :name="menu.name+'-'+index1">
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
            icon: "person",
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
              },{
                name: "直播",
                url: "liveTelecast"
              }
            ]
          },
          {
            name: "CMS",
            icon: "easel",
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
    },
    mounted(){
    },
    methods: {
      getSubMenuName(name){
          console.log(name.substr(0, name.indexOf("-")))
        this.$store.dispatch('Action_Menu_Name', name.substr(0, name.indexOf("-")));
      }
    }
  }
</script>
