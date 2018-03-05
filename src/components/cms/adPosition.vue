<template>
  <div>
    <h1 class="title">广告位管理</h1>
    <div class="box-wrap">
      <Button type="success" @click="addModal=true">添加广告位</Button>
    </div>
    <Table border :columns="adPositionCol" :data="adPositionData"></Table>
    <Modal
      title="添加广告位"
      v-model="addModal"
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
        <Button type="success" size="large" long :loading="modalLoad" @click="postForm('adPositionForm')">添加</Button>
      </div>
    </Modal>
    <Modal
      title="删除广告位"
      v-model="deleteModal"
      class-name="vertical-center-modal">
      <h2 style="text-align: center">确定删除广告位吗？</h2>
      <div slot="footer">
        <Button type="text" @click="closeModal">取消</Button>
        <Button type="primary" :loading="modalLoad" @click="removeForm">确定</Button>
      </div>
    </Modal>
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
        adPositionCol: [
          {
            title: '广告位名称',
            key: 'name'
          },
          {
            title: '描述',
            key: 'description'
          },
          {
            title: '排序',
            key: 'sort'
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
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.removePrompt(params)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        adPositionData: [],
        addModal: false,
        deleteModal: false,
        modalLoad: false,
        aa: true,
        adPositionForm: {
          name: null,
          description: null,
          sort: null
        },
        deleteData: {
          index: null,
          id: null
        },
        ruleCustom: {
          name: [
            { required: true, message: '请填写广告位名称', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请填写描述', trigger: 'blur' }
          ],
          sort: [
            { validator: validateSort, required: true, trigger: 'blur' }
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
        this.adPositionData = res;
        console.log(res)
      },
      postForm(name){
        this.modalLoad = true;
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            this.addModal = false;
            this.modalLoad = false;
            const getData = (data) => this.fetch("post", "/createAdsense", data);
            let res = await  getData(this.adPositionForm);
            if (res.code === 200) {
              this.$Message.success(res.message);
              this.getAdPosition();
            } else {
              this.$Message.error(res.message);
            }
          } else {
            this.modalLoad = false;
          }
        })
      },
      removePrompt (row) {
        this.deleteData.id = row.row._id;
        this.deleteData.index = row.index;
        this.deleteModal = true;
      },
      async removeForm () {
        const getData = () => this.fetch("post", "/deleteAdsense", { id: this.deleteData.id });
        let res = await  getData();
        this.deleteModal = false;
        if (res.code === 200) {
          this.adPositionData.splice(this.deleteData.index, 1);
          this.$Message.success(res.message);
        } else {
          this.$Message.error(res.message);
        }
      },
      closeModal(){
        this.deleteModal = false;
      }
    }
  }
</script>
