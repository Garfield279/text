<template>
  <div class="dialog">
    <el-link icon="el-icon-edit" type="primary" :underline="false" @click="getStudent">编辑</el-link>

    <el-dialog title="修改学生信息" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" style="display: inline-block">
          <el-select v-model="form.gender" placeholder="请选择宿舍类型">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宿舍号">
          <el-input v-model="form.dormitoryId"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="班级" style="display: inline-block">
          <el-select v-model="form.className" placeholder="请选择宿舍类型">
            <el-option v-for="item in className" :key="item.className" :label="item.className" :value="item.className"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班主任" style="display: inline-block">
          <el-select v-model="form.classTeacher" placeholder="请选择宿舍类型">
            <el-option v-for="item in classTeacher" :key="item.classTeacher" :label="item.classTeacher" :value="item.classTeacher"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">修改</el-button>
          <el-button @click="dialogFormVisible = false"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { updateStudentApi, getStudentApi } from '@/api/student'
export default {
  name: 'dialogFormVisible',
  props: ['id', 'className', 'classTeacher'],
  data () {
    return {
      dialogFormVisible: false,
      form: {
        id: '',
        name: '',
        gender: '',
        dormitoryId: '',
        phoneNumber: '',
        className: '',
        classTeacher: ''
      },
      formLabelWidth: '120px'
    }
  },
  inject: ['getStudentList', 'getClassName', 'getclassTeacher'],
  methods: {
    async onSubmit () {
      const res = await updateStudentApi(this.form)
      if (res.data.code) {
        this.$message.success('修改操作成功')
      } else {
        this.$message.error('修改操作失败')
      }
      this.dialogFormVisible = false
      this.getStudentList()
    },
    async getStudent () {
      this.dialogFormVisible = true
      const res = await getStudentApi(this.id)
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
