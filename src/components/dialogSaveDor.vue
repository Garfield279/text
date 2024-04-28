<template>
  <div class="dialog">
    <el-button type="text" @click="dialogFormVisible = true"
      >点击新增</el-button
    >

    <el-dialog title="添加宿舍信息" :visible.sync="dialogFormVisible">
      <el-form :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="宿舍楼栋">
          <el-input v-model="form.buildingNumber"></el-input>
        </el-form-item>
        <el-form-item label="房间号">
          <el-input v-model="form.roomNumber"></el-input>
        </el-form-item>
        <el-form-item label="宿舍类型">
          <el-select v-model="form.dormitoryType" placeholder="请选择宿舍类型">
            <el-option label="男生宿舍" value="男"></el-option>
            <el-option label="女生宿舍" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="床位数">
          <el-select v-model="form.bedCount" placeholder="请选择宿舍类型">
            <el-option label="4床位" value="4"></el-option>
            <el-option label="6床位" value="6"></el-option>
            <el-option label="8床位" value="8"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宿舍备注">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item style="display: block;">
          <el-button type="primary" @click="onSubmit" style="margin-left: 80px">添加</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
import { saveDorApi } from '@/api/dor'
export default {
  name: 'dialogFormVisible',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        buildingNumber: '',
        roomNumber: '',
        bedCount: '',
        dormitoryType: '',
        remark: '无'
      },
      formLabelWidth: '120px'
    }
  },
  inject: ['getDorLine'],
  methods: {
    async onSubmit () {
      const res = await saveDorApi(this.form)
      if (res.data.code) {
        console.log('添加成功')
        this.$message.success('添加操作成功')
      } else {
        this.$message.error('添加操作失败')
      }
      this.dialogFormVisible = false
      this.getDorLine()
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog::v-deep {
  .el-form-item__label {
    float: left !important;
  }
  .el-form-item__content, .el-select {
    width: 300px !important;
  }
  .el-input {
    width: 100%;
  }
  .el-button {
    float: none !important;
  }
}
</style>
