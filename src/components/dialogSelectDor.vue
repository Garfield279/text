<template>
  <div class="dialog">
    <el-button
      type="primary"
      icon="el-icon-view"
      @click="getStudentList"
    ></el-button>

    <el-dialog title="查看宿舍人员" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column
          property="name"
          label="姓名"
          width="150"
        ></el-table-column>
        <el-table-column
          property="gender"
          label="男"
          width="80"
        ></el-table-column>
        <el-table-column property="phoneNumber" label="电话" align="center"></el-table-column>
        <el-table-column property="className" label="班级" align="center"></el-table-column>
        <el-table-column property="classTeacher" label="老师" align="center"></el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
import { getStudentListApi } from '@/api/dor'
export default {
  name: 'dialogTableVisible',
  props: ['roomNumber'],
  data () {
    return {
      dialogTableVisible: false,
      gridData: []
    }
  },
  methods: {
    async getStudentList () {
      this.dialogTableVisible = true
      const res = await getStudentListApi(this.roomNumber)
      this.gridData = res.data.data
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
