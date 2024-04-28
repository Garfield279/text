<template>
  <div class="dialog">
    <el-link icon="el-icon-edit" type="primary" :underline="false" @click="getById">编辑</el-link>

    <el-dialog title="编辑维修记录" :visible.sync="dialogFormVisible">
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
          <el-button type="primary" @click="onSubmit" style="margin: 0 10px 0 80px">修改</el-button>
          <el-button @click="dialogFormVisible = false"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { updateMaintenanceApi, getByIdApi } from '@/api/maintenance'
export default {
  name: 'dialogFormVisible',
  props: ['id'],
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
      const res = await updateMaintenanceApi(this.form)
      if (res.data.code) {
        this.$message.success('修改操作成功')
      } else {
        this.$message.error('修改操作失败')
      }
      this.dialogFormVisible = false
      this.getMaintenanceList()
    },
    async getById () {
      this.dialogFormVisible = true
      const res = await getByIdApi(this.id)
      this.form = res.data.data
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog::v-deep {
  display: inline-block;
  text-align: left;
  margin-right: 20px;
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
