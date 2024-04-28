<template>
  <div class="dialog">
    <el-button @click="dialogFormVisible = true"
      >更改密码</el-button
    >

    <el-dialog title="更改密码" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="旧密码">
          <el-input v-model="form.oldPassword"></el-input>
        </el-form-item>
        
        <el-form-item label="新密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="onSubmit">更改</el-button>
          <el-button @click="dialogFormVisible = false"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { updateApi } from '@/api/my'
export default {
  name: 'dialogFormVisible',
  data () {
    return {
      dialogFormVisible: false,
      imageUrl: '',
      fileData: [],
      form: {
        id: '',
        oldPassword: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      this.form.id = window.sessionStorage.getItem("id")
      const res = await updateApi(this.form)
      if (res.data.code) {
        this.$message.success('上传操作成功')
      } else {
        this.$message.error('上传操作失败')
      }
      this.dialogFormVisible = false
    },
  }
}
</script>

<style lang="scss" scoped>
.dialog::v-deep {
  display: inline-block;
  .el-button {
    margin-top: 10px;
  }
  .el-input {
    width: 45%;
  }
}
</style>
