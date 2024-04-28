<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true"
      >新增记录</el-button
    >

    <el-dialog class="dialog" title="新增卫生记录" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="房间号">
          <el-input v-model="form.dormitoryId"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="form.data" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="班主任">
          <el-select v-model="form.cleanlinessLevel" placeholder="请选择宿舍类型">
            <el-option label="优秀" value="优秀"></el-option>
            <el-option label="良好" value="良好"></el-option>
            <el-option label="一般" value="一般"></el-option>
            <el-option label="差" value="差"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宿舍备注">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="margin-left: 80px">添加</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { saveCleanApi } from '@/api/clean'
export default {
  name: 'dialogFormVisible',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        dormitoryId: '',
        data: '',
        cleanlinessLevel: '',
        remark: '无'
      }
    }
  },
  inject: ['getCleanList'],
  methods: {
    async onSubmit () {
      const res = await saveCleanApi(this.form)
      if (res.data.code) {
        console.log('添加成功')
        this.$message.success('添加操作成功')
      } else {
        this.$message.error('添加操作失败')
      }
      this.dialogFormVisible = false
      this.getCleanList()
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog::v-deep {
  .el-form--inline .el-form-item__content {
    display: block !important;
  }
  .el-form-item__content, .el-select {
    width: 300px !important;
  }
  .el-form-item__content {
    margin-left: 10px !important;
  }
  .el-input {
    width: 100%;
  }
}
</style>
