<template>
  <div class="dialog">
    <!-- <el-button type="primary" icon="el-icon-plus" :underline="false" @click="dialogFormVisible = true">新增</el-button> -->
    <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>

    <el-dialog title="新增维修记录" :visible.sync="dialogFormVisible">
      <el-form :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="宿舍号">
          <el-input v-model="form.roomNumber"></el-input>
        </el-form-item>
        <el-form-item label="记录日期">
          <el-date-picker v-model="form.data" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="维修物品">
          <el-input v-model="form.maintenanceItem"></el-input>
        </el-form-item>
        <el-form-item label="损坏原因">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item style="display: block">
          <el-button type="primary" @click="onSubmit" style="margin: 0 10px 0 80px">添加</el-button>
          <el-button @click="dialogFormVisible = false"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { saveMaintenanceApi } from '@/api/maintenance'
export default {
  name: 'dialogFormVisible',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        roomNumber: '',
        data: '',
        maintenanceItem: '',
        remark: ''
      }
    }
  },
  inject: ['getMaintenanceList'],
  methods: {
    async onSubmit () {
      const res = await saveMaintenanceApi(this.form)
      if (res.data.code) {
        this.$message.success('添加操作成功')
      } else {
        this.$message.error('添加操作失败')
      }
      this.dialogFormVisible = false
      this.getMaintenanceList()
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog::v-deep {
  float: right;
  margin-right: 10px;
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
