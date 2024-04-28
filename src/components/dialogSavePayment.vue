<template>
  <div class="dialog">
    <!-- <el-button type="primary" icon="el-icon-plus" :underline="false" @click="dialogFormVisible = true">新增</el-button> -->
    <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>

    <el-dialog title="新增费用记录" :visible.sync="dialogFormVisible">
      <el-form :inline="true" ref="form" :model="form" label-width="80px">
        <el-form-item label="宿舍号">
          <el-input v-model="form.roomNumber"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="缴费日期">
          <el-date-picker v-model="form.paymentDate" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="截止日期" >
          <el-date-picker v-model="form.dueDate" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="缴费金额">
          <el-input v-model="form.amount"></el-input>
        </el-form-item>
        <el-form-item label="缴费类型">
          <el-select v-model="form.tag" placeholder="请选择宿舍类型">
            <el-option label="罚款费" value="罚款费"></el-option>
            <el-option label="住宿费" value="住宿费"></el-option>
            <el-option label="赔款费" value="赔款费"></el-option>
          </el-select>
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
import { savePaymentApi } from '@/api/payment'
export default {
  name: 'dialogFormVisible',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        roomNumber: '',
        name: '',
        paymentDate: '',
        dueDate: '',
        amount: '',
        tag: ''
      }
    }
  },
  inject: ['getPaymentList'],
  methods: {
    async onSubmit () {
      const res = await savePaymentApi(this.form)
      if (res.data.code) {
        this.$message.success('添加操作成功')
      } else {
        this.$message.error('添加操作失败')
      }
      this.dialogFormVisible = false
      this.getPaymentList()
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog::v-deep {
  float: right;
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
