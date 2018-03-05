<template>
  <div>
    <Form ref="advertForm" :model="advertForm" :rules="ruleValidate" :label-width="80">
      <Form-item label="广告位" prop="adsenseId">
        <Select v-model="advertForm.adsenseId" placeholder="请选择广告位">
          <Option v-for="(adPosition, index) in adPositionData" :value="adPosition._id" :key="index">{{adPosition.name}}
          </Option>
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
  </div>
</template>

<script>
  export default {
    props: [
      'advertForm',
      'ruleValidate',
      'adPositionData',
      'uploadList',
      'urlValidator',
      'defaultList',
      'handleSuccess',
      'handleFormatError',
      'handleMaxSize',
      'handleBeforeUpload',
      'modalLoad',
      'fileList',
    ],
    mounted(){
      console.log(this);
    }
  };
</script>
