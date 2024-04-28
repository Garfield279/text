<template>
  <div class="dialog">
    <el-button @click="dialogFormVisible = true" style="margin-left: 28px"
      >更换头像</el-button
    >

    <el-dialog title="新增费用记录" :visible.sync="dialogFormVisible">
      <el-upload
        class="avatar-uploader"
        :action="''"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>

      <el-button type="primary" @click="onSubmit">更换</el-button>
      <el-button @click="dialogFormVisible = false">取消</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { uploadApi, updateApi } from '@/api/my'
export default {
  name: 'dialogFormVisible',
  data () {
    return {
      dialogFormVisible: false,
      imageUrl: '',
      fileData: [],
      form: {
        id: '',
        avatar: ''
      }
    }
  },
  methods: {
    beforeAvatarUpload (file) {
      const isJPG = file.raw.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
        return isJPG
      } else if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return isLt2M
      } else {
        this.imageUrl = URL.createObjectURL(file.raw)
        this.fileData = file
      }
    },
    async onSubmit () {
      // 创建FormData对象
      const formData = new FormData()
      formData.append('file', this.fileData.raw)
      // 发送请求
      const res = await uploadApi(formData)
      // 判断给用户提示
      if (res.data.code) {
        this.$message.success('上传操作成功')
        this.imageUrl = res.data.data

        this.update()
        
        this.$emit('getImageUrl', this.imageUrl)
      } else {
        this.$message.error('上传操作失败')
      }
      this.dialogFormVisible = false
      this.imageUrl = ''
      location.reload()
    },
    async update () {
      this.form.id = window.sessionStorage.getItem("id")
      this.form.avatar = this.imageUrl
      await updateApi(this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog::v-deep {
  display: inline-block;
  .el-button {
    margin-top: 10px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
