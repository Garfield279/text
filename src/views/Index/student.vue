<template>
  <el-container>
    <el-main class="main">
      <el-header class="serch">
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <el-form-item style="margin-right: 650px" prop="name">
            <el-input v-model="formInline.name" placeholder="输入名字"></el-input>
          </el-form-item>
          <el-form-item prop="classTeacher">
            <el-select v-model="formInline.classTeacher" placeholder="班主任">
              <el-option v-for="item in classTeacher" :key="item.classTeacher" :label="item.classTeacher" :value="item.classTeacher"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="className">
            <el-select v-model="formInline.className" placeholder="班级">
              <el-option v-for="item in className" :key="item.className" :label="item.className" :value="item.className"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item style="margin-right: 0">
            <el-button type="primary" @click="resetForm('formInline')">查询全部</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main class="table">
        <el-header>
          学生信息详情
          <el-button type="primary" icon="el-icon-download" @click="port">导出</el-button>
          <SaveDialog :className="className" :classTeacher="classTeacher">新增</SaveDialog>
        </el-header>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="enrollmentDate" label="入学时间" width="180">
          </el-table-column>
          <el-table-column prop="className" label="班级"> </el-table-column>
          <el-table-column prop="name" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="gender" label="性别" width="180">
          </el-table-column>
          <el-table-column prop="dormitoryId" label="宿舍号" width="180">
          </el-table-column>
          <el-table-column prop="phoneNumber" label="手机号"> </el-table-column>
          <el-table-column prop="classTeacher" label="班主任" align="center">
          </el-table-column>
          <el-table-column prop="address" label="操作" align="center">
            <template slot-scope="scope">
                <el-row>
            <UpdateDialog ref="update" :id="scope.row.id" :className="className" :classTeacher="classTeacher">编辑</UpdateDialog>
            <el-link icon="el-icon-delete" type="danger" :underline="false" @click="del(scope.row.id)"
              >删除</el-link
            >,
            </el-row>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-footer>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="formInline.currentPage"
            :page-sizes="[5, 10, 15]"
            :page-size="formInline.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageTotal"
          >
          </el-pagination>
        </el-footer>
      </el-main>
    </el-main>
  </el-container>
</template>

<script>
import { getExport } from '@/api/home'
import { getPageApi, getClassNameApi, getClassTeacherApi, delStudentApi } from '@/api/student'
import UpdateDialog from '@/components/dialogUpdateStudent.vue'
import SaveDialog from '@/components/dialogSaveStudent.vue'
export default {
  name: 'studentView',
  components: {
    UpdateDialog,
    SaveDialog
  },
  data () {
    return {
      tableData: [],
      className: [],
      classTeacher: [],
      formInline: {
        name: '',
        classTeacher: '',
        className: '',
        pageSize: 5,
        currentPage: 1
      },
      pageTotal: 100
    }
  },
  provide () {
    return {
      getStudentList: this.getStudentList,
      getClassName: this.getClassName,
      getclassTeacher: this.getclassTeacher
    }
  },
  created () {
    this.getStudentList()
    this.getClassName()
    this.getclassTeacher()
  },
  methods: {
    async port () {
      const res = await getExport(this.formInline)
      console.log(res);
      if (true) {
        const blob = new Blob([res.data], { type: "application/xlsx" })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = '文件.xlsx'
        link.click()
        URL.revokeObjectURL(url)
      }
    },
    handleSizeChange (val) {
      this.formInline.pageSize = val
      this.getStudentList()
    },
    handleCurrentChange (val) {
      this.formInline.currentPage = val
      this.getStudentList()
    },
    onSubmit () {
      this.getStudentList()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.getStudentList()
    },
    async getStudentList () {
      const res = await getPageApi(this.formInline)
      this.tableData = res.data.data.records
      this.pageTotal = res.data.data.total
    },
    async getClassName () {
      const res = await getClassNameApi()
      this.className = res.data.data
    },
    async getclassTeacher () {
      const res = await getClassTeacherApi()
      this.classTeacher = res.data.data
    },
    del (id) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return delStudentApi(id)
      }).then(() => {
        this.getStudentList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 20px 40px !important;
  .serch {
    height: 80px !important;
    form {
      display: flex;
      justify-content: center;
      padding: 20px 0;
    }
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .table {
    padding: 0;
    .el-header {
      margin-bottom: 0px;
      border-bottom: 1px solid #ebeef5;
      line-height: 60px;
      padding: 0 10px;
      .el-button {
        float: right;
        margin: 11px 0 5px 10px;
      }
    }
    .el-link {
      padding-right: 20px;
    }
  }
  .el-header {
    margin-bottom: 20px;
    padding: 0 10px;
  }
  .el-header,
  .el-main {
    background-color: #fff;
  }
  .el-footer {
    padding: 0 10px;
    .el-pagination {
      padding: 15px 0px;
      float: right;
    }
  }
}
</style>
