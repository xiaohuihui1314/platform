<template>
  <div>
    <h1 class="title">广告管理</h1>
    <div class="box-wrap">
      <div></div>
      <Button type="success" @click="addModal=true">添加广告</Button>
    </div>
    <Table border :columns="advertCol" :data="showData"></Table>
    <Page style="margin-top: 25px;float: right" :total="dataCount" :page-size="pageSize" @on-change="pageChange" show-elevator ></Page>
    <Modal
      title="添加广告"
      v-model="addModal"
      class-name="vertical-center-modal">
      <ModalForm
        :addModal="addModal"
        :advertForm="advertForm"
        :ruleValidate="ruleValidate"
        :adPositionData="adPositionData"
        :defaultList="defaultList"
        :modalLoad="modalLoad"
        :urlValidator="urlValidator"
        :addForm="addForm"
        @changeValidator="changeValidator"
        @changeFile="changeFile"
      />
    </Modal>
    <Modal
      title="删除广告"
      v-model="deleteModal"
      class-name="vertical-center-modal">
      <h2 style="text-align: center">确定删除广告吗？</h2>
      <div slot="footer">
        <Button type="text" @click="closeModal">取消</Button>
        <Button type="primary" :loading="modalLoad" @click="removeForm">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<style>
  @import "../../assets/style/cms/adPosition.scss";

  .url-validator-border {
    border: 1px solid #ed3f14
  }

  .url-validator-text {
    color: #ed3f14;
  }

  /*上传图片*/
  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }

</style>
<script>
  import ModalForm from './modal';
  export default{
    data () {
      const validateSort = (rule, value, callback) => {
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
        formValidate: {
          date: null
        },
        //  显示的数据
        showData: [],
        //  初始数据条数
        dataCount: 0,
        //  每页多少条数据
        pageSize: 5,
        advertCol: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '广告位',
            key: 'addressName'
          },
          {
            title: '广告名称',
            key: 'title'
          },
          {
            title: '结束时间',
            key: 'endTime'
          },
          {
            title: '开始时间',
            key: 'startTime'
          },
          {
            title: '描述',
            key: 'describe'
          },
          {
            title: '状态',
            key: 'state',
            render: (h, params) => {
              if (params.row.state) {
                return "开启中"
              } else {
                return "已关闭"
              }
            }
          },
          {
            width: 65,
            title: '排序',
            key: 'sort'
          },
          {
            title: '图片',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('img', {
                attrs: {
                  width: '100%',
                  height: '100%',
                  src: this.$file + params.row.url
                }
              })
            }
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
                }, '删除'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.editPrompt(params)
                    }
                  }
                }, '修改')
              ]);
            }
          }
        ],
        advertData: [],
        adPositionData: [],
        addModal: false,
        deleteModal: false,
        modalLoad: false,
        aa: true,
        advertForm: {
          adsenseId: null,
          title: null,
          url: null,
          link: null,
          describe: null,
          startTime: null,
          endTime: null,
          state: false,
          sort: null
        },
        deleteData: {
          index: null,
          id: null
        },
        //  验证
        ruleValidate: {
          adsenseId: [
            { required: true, message: '请选择广告位', trigger: 'change' }
          ],
          title: [
            { required: true, message: '请填写广告标题', trigger: 'blur' }
          ],
          link: [
            { required: true, message: '请填写广告连接', trigger: 'blur' }
          ],
          describe: [
            { required: true, message: '请填写广告描述', trigger: 'blur' }
          ],
          startTime: [
            { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
          ],
          endTime: [
            { required: true, type: 'date', message: '请选择日期', trigger: 'change' }
          ],
          sort: [
            { validator: validateSort, required: true, trigger: 'blur' }
          ]
        },
        urlValidator: null,
        defaultList: [],
        imgName: '',
        visible: false,
        uploadArray: [],
      }
    },
    mounted(){
      this.getAdvert();
      this.getAdsense();
      this.searchAdvert();
    },
    methods: {
      //  获取广告位列表
      async getAdsense(){
        const getData = () => this.fetch("get", "/getAdsense");
        let res = await  getData();
        this.adPositionData = res;
      },
      //  获取广告列表
      async getAdvert(){
        const getData = () => this.fetch("get", "/getAdvert");
        let res = await getData();
        this.advertData = res;
        this.dataCount = res.length;
        if (res.length < this.pageSize) {
          this.showData = res;
        } else {
          this.showData = res.slice(0, this.pageSize);
        }
      },
      //  新增广告
      async addForm (valid)  {
        if (valid && this.uploadArray.length !== 0) {
          this.addModal = false;
          this.modalLoad = false;
          this.advertForm.url = this.uploadArray[0].url;
          const getData = (data) => this.fetch("post", "/createAdvert", data);
          let res = await  getData(this.advertForm);
          if (res.code === 200) {
            this.$Message.success(res.message);
            this.getAdvert();
          } else {
            this.$Message.error(res.message);
          }
        } else {
          this.urlValidator = true;
          this.modalLoad = false;
        }
      },
      //  删除广告
      async searchAdvert () {
        const getData = () => this.fetch("post", "/searchAdvert", { id: this.deleteData.id });
        let res = await  getData();
      },
      //  删除广告弹框提示
      removePrompt (row) {
        this.deleteData.id = row.row.id;
        this.deleteData.index = row.index;
        this.deleteModal = true;
      },
      //  修改弹框
      editPrompt(params){
        console.log(params);
        this.defaultList = [{ url: params.row.url }];
        this.uploadArray = [];
        this.addModal = true;
        this.advertForm.adsenseId = params.row.adsenseId;
        this.advertForm = Object.assign(this.advertForm, params.row);
      },
      //  删除广告
      async removeForm () {
        const getData = () => this.fetch("post", "/deleteAdvert", { id: this.deleteData.id });
        let res = await  getData();
        this.deleteModal = false;
        if (res.code === 200) {
          this.advertData.splice(this.deleteData.index, 1);
          this.$Message.success(res.message);
        } else {
          this.$Message.error(res.message);
        }
      },
      //  关闭删除广告提示弹框
      closeModal(){
        this.deleteModal = false;
      },
      handleView (name) {
        this.imgName = name;
        this.visible = true;
      },
      changeFile: function(data) {
        this.uploadArray = data;
      },
      changeValidator: function(data) {
        this.urlValidator = data;
      },
      pageChange(page){
        var _start = ( page - 1 ) * this.pageSize;
        var _end = page * this.pageSize;
        this.showData = this.advertData.slice(_start, _end);
      }
    },
    components: {
      ModalForm
    }
  }
</script>
