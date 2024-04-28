<template>
  <el-container class="box">
    <el-main class="main">
      <el-main class="table">
        <el-container class="center">
          <el-aside width="60%">
            <el-table :data="stuTableData" style="width: 100%; height: 750px">
              <el-table-column prop="dormitoryId" label="宿舍号"> </el-table-column>
              <el-table-column prop="name" label="姓名"> </el-table-column>
              <el-table-column prop="gender" label="性别"> </el-table-column>
              <el-table-column prop="className" label="班级"> </el-table-column>
              <el-table-column prop="classTeacher" label="班主任"> </el-table-column>
            </el-table>
          </el-aside>
          <el-main style="margin-left: 30px">
            <el-table :data="dorTableData" style="width: 100%; height: 750px">
              <el-table-column prop="roomNumber" label="宿舍" width="130px">
              </el-table-column>
              <el-table-column prop="remark" label="备注" align="center">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-row>
                    <el-link
                      icon="el-icon-edit"
                      type="primary"
                      :underline="false"
                      @click="getRemarkStudents(scope.row.roomNumber)"
                      >查看</el-link
                    >
                    <el-link
                      icon="el-icon-delete"
                      type="danger"
                      :underline="false"
                      @click="updateRemark(scope.row.roomNumber)"
                      >删除</el-link
                    >
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </el-main>
    </el-main>
  </el-container>
</template>

<script>
import { getRemarkDorListApi, getRemarkStudentsApi, updateRemarkApi } from '@/api/remark'
export default {
  name: 'remarkView',
  data () {
    return {
      stuTableData: [],
      dorTableData: []
    }
  },
  created () {
    this.getRemarkDorList()
  },
  methods: {
    async getRemarkDorList () {
      const res = await getRemarkDorListApi()
      this.dorTableData = res.data.data

      if (this.dorTableData[0] != null) {
        this.getRemarkStudents(this.dorTableData[0].roomNumber)
      }
    },
    async getRemarkStudents (roomNumber) {
      const res = await getRemarkStudentsApi(roomNumber)
      this.stuTableData = res.data.data
    },
    // async updateRemark (roomNumber) {
    //   const res = await updateRemarkApi(roomNumber)
    // },
    // 删除信息
    updateRemark (roomNumber) {
      this.$confirm('是否移除该宿舍备注, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return updateRemarkApi(roomNumber)
      }).then(() => {
        this.getRemarkDorList()
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
.box {
  height: 100%;
}
.main {
  padding: 20px 40px !important;
  .center {
    background-color: #f7f9fb;
    .el-main {
      padding: 0;
    }
  }
  form {
    display: inline-block;
    // justify-content: center;
    // padding: 20px 0;
  }
  .el-form-item {
    margin-bottom: 0;
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
        margin: 10px 0 10px;
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
