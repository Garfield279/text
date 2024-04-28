<template>
  <div class="dialog">
    <el-button type="primary" icon="el-icon-edit" @click="getRoom"></el-button>

    <el-dialog title="修改宿舍信息" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="宿舍楼栋">
          <el-input v-model="form.buildingNumber"></el-input>
        </el-form-item>
        <el-form-item label="房间号">
          <el-input v-model="form.roomNumber"></el-input>
        </el-form-item>
        <el-form-item label="宿舍类型" style="display: inline-block;">
          <el-select v-model="form.dormitoryType" placeholder="请选择宿舍类型">
            <el-option label="男生宿舍" value="男"></el-option>
            <el-option label="女生宿舍" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="床位数" style="display: inline-block;">
          <el-select v-model="form.bedCount" placeholder="请选择宿舍类型">
            <el-option label="4床位" value="4"></el-option>
            <el-option label="6床位" value="6"></el-option>
            <el-option label="8床位" value="8"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宿舍备注">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">修改</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
import { updateDorApi, getRoomApi } from '@/api/dor'
export default {
  name: 'dialogFormVisible',
  props: ['roomNumber'],
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
      const res = await updateDorApi(this.form)
      if (res.data.code) {
        this.$message.success('修改操作成功')
      } else {
        this.$message.error('修改操作失败')
      }
      this.dialogFormVisible = false
      this.getDorLine()
    },
    async getRoom () {
      this.dialogFormVisible = true
      const res = await getRoomApi(this.roomNumber)
      this.form = res.data.data
    }
  }
}
</script>

<style scoped>
.dialog {
  display: inline-block;
  margin-right: 10px;
  text-align: left;
}
</style>
