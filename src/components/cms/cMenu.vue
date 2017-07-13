<template>
  <div>
    <Tree :data="baseData" show-checkbox @on-select-change="aaa($el)"></Tree>
  </div>
</template>
<script>
    export default{
        data() {
          return {
            baseData: [{
              expand: true,
              title: 'parent 1',
              children: [{
                title: 'parent 1-0',
                expand: true,
                disabled: true,
                children: [{
                  title: 'leaf',
                  disableCheckbox: true
                }, {
                  title: 'leaf',
                }]
              }, {
                title: 'parent 1-1',
                expand: true,
                checked: true,
                children: [{
                  title: '<span style="color: red">leaf</span>',
                }]
              }]
            }]
          }
        },
      methods:{
            aaa(e,aa){
                console.log(e,aa,888)
            }
      }
    }
</script>
