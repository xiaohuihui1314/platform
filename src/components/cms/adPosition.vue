<template>
  <div>
    <h1 class="title">广告位管理</h1>
    <div class="box-wrap">
      <Button type="success" @click="modalState=true">添加广告位</Button>
    </div>
    <Modal
      title="添加广告位"
      v-model="modalState"
      class-name="vertical-center-modal">
      <Form ref="adPositionForm" :model="adPositionForm" :rules="ruleCustom" :label-width="80">
        <Form-item label="广告位" prop="name">
          <Input placeholder="请输入广告位名称" v-model="adPositionForm.name"/>
        </Form-item>
        <Form-item label="描述" prop="description">
          <Input type="textarea" v-model="adPositionForm.description" placeholder="请输入描述"/>
        </Form-item>
        <Form-item label="排序" prop="sort">
          <Input v-model="adPositionForm.sort" number/>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="error" size="large" long :loading="modalLoad" @click="postForm('adPositionForm')">删除</Button>
      </div>
    </Modal>
    <Table border :columns="columns7" :data="adPositionData"></Table>
  </div>
</template>
<style>
  @import "../../assets/style/cms/adPosition.scss";
</style>
<script>
  export default{
    data () {
      const validateSort = (rule, value, callback) => {
        console.log(value)
        console.log(typeof value)
        console.log(!Number.isInteger(value))
        if (!value) {
          return callback(new Error('排序不能为空'));
        } else if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        } else {
          if (value > 100) {
            callback(new Error('不能超过10'));
          } else {
            callback();
          }
        }
      };
      return {
        columns7: [
          {
            title: '姓名',
            key: 'name',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.name)
              ]);
            }
          },
          {
            title: '年龄',
            key: 'age'
          },
          {
            title: '地址',
            key: 'address'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        adPositionData: [],
        modalState: false,
        modalLoad: false,
        aa: true,
        adPositionForm: {
          name: null,
          description: null,
          sort: null
        },
        ruleCustom: {
          name: [
            {required: true, message: '请填写广告位名称', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '请填写描述', trigger: 'blur'}
          ],
          sort: [
            {validator: validateSort,required: true, trigger: 'blur'}
          ]
        }
      }
    },
    mounted(){
      this.getAdPosition()
    },
    methods: {
      async getAdPosition(){
        const getData = () => this.fetch("get", "/getAdsense");
        let res = await  getData();
        console.log(res)
      },
      postForm(name){
        this.modalLoad = true;
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.modalState = false;
            this.modalLoad = false;
            this.$Message.success('提交成功!');
          } else {
            setTimeout(() => {
              this.modalLoad = false;
            }, 2000);
            this.$Message.error('表单验证失败!');
          }
        })


      }
    }
  }
</script>
