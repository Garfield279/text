<template>
  <div class="dialog">
    <el-link icon="el-icon-edit" type="primary" :underline="false" @click="getById"
                >编辑</el-link
              >

    <el-dialog title="修改宿舍信息" :visible.sync="dialogFormVisible">
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
          <el-button type="primary" @click="onSubmit">修改</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </div>
</template>

<script>
import { updateCleanApi, getByIdApi } from '@/api/clean'
export default {
  name: 'dialogFormVisible',
  props: ['id'],
  data () {
    return {
      dialogFormVisible: false,
      form: {
        id: '',
        dormitoryId: '',
        data: '',
        cleanlinessLevel: '',
        remark: '无'
      },
      formLabelWidth: '120px'
    }
  },
  inject: ['getCleanList'],
  methods: {
    async onSubmit () {
      const res = await updateCleanApi(this.form)
      if (res.data.code) {
        console.log('修改成功')
        this.$message.success('修改操作成功')
      } else {
        this.$message.error('修改操作失败')
      }
      this.dialogFormVisible = false
      this.getCleanList()
    },
    async getById () {
      this.dialogFormVisible = true
      const res = await getByIdApi(this.id)
      this.form = res.data.data
    }
  }
}
</script>

<style scoped>
.dialog {
  display: inline-block;
  margin-right: 20px;
  text-align: left;
}
</style>
