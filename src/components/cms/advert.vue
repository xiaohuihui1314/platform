<template>
  <div>
    <h1 class="title">广告管理</h1>
    <div class="box-wrap">
      <Button type="success" @click="addModal=true">添加广告</Button>
    </div>
    <Table border :columns="advertCol" :data="advertData"></Table>
    <Modal
      title="添加广告"
      v-model="addModal"
      class-name="vertical-center-modal">
      <Form ref="advertForm" :model="advertForm" :rules="ruleValidate" :label-width="80">
        <Form-item label="广告位" prop="adsenseId">
          <Select v-model="advertForm.adsenseId" placeholder="请选择广告位">
            <Option v-for="(adPosition, index) in adPositionData" :value="adPosition._id" :key="index">{{adPosition.name}}</Option>
          </Select>
        </Form-item>
        <Form-item label="广告标题" prop="title">
          <Input placeholder="请输入广告名称" v-model="advertForm.title"/>
        </Form-item>

        <Form-item label="广告图片" prop="url">
          <div class="demo-upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'">
              <img :src="$file+item.url">
            </template>
          </div>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :default-file-list="defaultList"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            type="drag"
            action="http://localhost:3000/upload"
            :class="{ 'url-validator-border': urlValidator }"
            style="display: inline-block;width:60px;">
            <div style="width: 60px;height:60px;line-height: 60px;">
              <Icon type="camera" size="20"></Icon>
            </div>
          </Upload>
          <p class="url-validator-text" v-show="urlValidator">请选择图片</p>
        </Form-item>
        <Form-item label="广告连接" prop="link">
          <Input placeholder="请输入广告连接" v-model="advertForm.link"/>
        </Form-item>
        <Form-item label="广告描述" prop="describe">
          <Input v-model="advertForm.describe" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                 placeholder="请输入广告描述"/>
        </Form-item>
        <Form-item label="开始时间">
          <Row>
            <Col span="11">
            <Form-item prop="startTime">
              <Date-picker type="date" placeholder="选择日期" v-model="advertForm.startTime"></Date-picker>
            </Form-item>
            </Col>
          </Row>
        </Form-item>
        <Form-item label="结束时间">
          <Row>
            <Col span="11">
            <Form-item prop="endTime">
              <Date-picker type="date" placeholder="选择结束日期" v-model="advertForm.endTime"></Date-picker>
            </Form-item>
            </Col>
          </Row>
        </Form-item>
        <Form-item label="开关">
          <i-switch v-model="advertForm.state" size="large">
            <span slot="true">开启</span>
            <span slot="false">关闭</span>
          </i-switch>
        </Form-item>
        <Form-item label="排序" prop="sort">
          <Input v-model="advertForm.sort" number/>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="success" size="large" long :loading="modalLoad" @click="postForm('advertForm')">添加</Button>
      </div>
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
                }, '删除')
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
        //        验证
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
        uploadList: []
      }
    },
    watch: {
      uploadList(val){
        if (val.length > 0) {
          this.urlValidator = false;
        }
      }
    },
    mounted(){
      this.uploadList = this.$refs.upload.fileList;
      this.getAdvert();
      this.getAdsense();
      this.searchAdvert();
    },
    methods: {
      //        获取广告位列表
      async getAdsense(){
        const getData = () => this.fetch("get", "/getAdsense");
        let res = await  getData();
        this.adPositionData = res;
      },
      //      获取广告列表
      async getAdvert(){
        const getData = () => this.fetch("get", "/getAdvert");
        let res = await  getData();
        this.advertData = res;
      },
      //      新增广告
      postForm(name){
        this.$refs[name].validate(async (valid) => {
          if (valid && this.uploadList.length !== 0) {
            this.addModal = false;
            this.modalLoad = false;
            this.advertForm.url = this.uploadList[0].url;
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
        })
      },
      //      删除广告
      async searchAdvert () {
        const getData = () => this.fetch("post", "/searchAdvert", { id: this.deleteData.id });
        let res = await  getData();
        console.log(res);
      },
      //      删除广告弹框提示
      removePrompt (row) {
        this.deleteData.id = row.row.id;
        this.deleteData.index = row.index;
        this.deleteModal = true;
      },
      //      删除广告
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
      //      关闭删除广告提示弹框
      closeModal(){
        this.deleteModal = false;
      },
      handleView (name) {
        this.imgName = name;
        this.visible = true;
      },
      //       从 upload 实例删除数据
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      //      上传返回
      handleSuccess (res, file) {
        let fileLength = this.$refs.upload.fileList.length;
        if (fileLength > 1) {
          this.$refs.upload.fileList.splice(0, fileLength - 1);
        }
        file.url = res.url;
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        });
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < 1;
        if (!check) {
          this.$Notice.warning({
            title: '最多只能上传 1 张图片。'
          });
        }
        return check;
      }
    }
  }
</script>
