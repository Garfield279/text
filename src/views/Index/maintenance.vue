<template>
  <el-container>
    <el-main class="main">
      <el-main class="table">
        <el-header>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item style="margin: 10px 10px 10px 0">
            <el-input v-model="formInline.dormitoryId" placeholder="输入宿舍号"></el-input>
          </el-form-item>
          <el-form-item prop="paymentDate" style="margin: 10px 0">
            <div class="block">
              <el-date-picker
                v-model="formInline.data"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </div>
          </el-form-item>
          </el-form>
          <el-button type="primary" style="float: none; margin: 10px" @click="onSubmit">搜索</el-button>
          <el-button type="primary" style="float: none; margin: 10px 0" @click="resetForm('formInline')">查询全部</el-button>
          <el-button type="primary" icon="el-icon-download">导出</el-button>
          <!-- <el-button type="primary" icon="el-icon-plus" style="margin-right: 10px;">新增</el-button> -->
          <SaveMaintenance></SaveMaintenance>
        </el-header>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="data" label="记录日期" width="280">
          </el-table-column>
          <el-table-column prop="roomNumber" label="宿舍号" width="150">
          </el-table-column>
          <el-table-column prop="maintenanceItem" label="维修物品" width="280" align="center">
          </el-table-column>
          <el-table-column prop="remark" label="损坏原因" width="260" align="center">
          </el-table-column>
          <el-table-column prop="address" label="操作" align="center">
            <template slot-scope="scope">
              <el-row>
            <UpdateMaintenance :id="scope.row.id"></UpdateMaintenance>
            <el-link icon="el-icon-delete" type="danger" :underline="false" @click="del(scope.row.id)"
              >删除</el-link
            >
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
            :page-sizes="[100, 200, 300, 400]"
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
import { maintenancePageApi, delMaintenanceApi } from '@/api/maintenance'
import SaveMaintenance from '@/components/dialogSaveMaintenance.vue'
import UpdateMaintenance from '@/components/dialogUpdateMaintenance.vue'
import moment from 'moment'
export default {
  name: 'maintenanceView',
  components: {
    SaveMaintenance,
    UpdateMaintenance
  },
  data () {
    return {
      tableData: [],
      formInline: {
        dormitoryId: '',
        data: '',
        pageSize: 5,
        currentPage: 1
      },
      pageTotal: 100,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      }
    }
  },
  provide () {
    return {
      getMaintenanceList: this.getMaintenanceList
    }
  },
  created () {
    this.getMaintenanceList()
  },
  methods: {
    handleSizeChange (val) {
      this.formInline.pageSize = val
      this.getMaintenanceList()
    },
    handleCurrentChange (val) {
      this.formInline.pageSize = val
      this.getMaintenanceList()
    },
    onSubmit () {
      this.getMaintenanceList()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.getMaintenanceList()
    },
    handleNodeClick (data) {
      console.log(data)
    },
    async getMaintenanceList () {
      if (this.formInline.data !== '') {
        this.formInline.data = moment(this.formInline.data).format('YYYY-MM-DD')
      }
      const res = await maintenancePageApi(this.formInline)
      this.tableData = res.data.data.records
      this.pageTotal = res.data.data.total
      this.tableData.forEach((item) => {
        item.data = item.data.replace('T', ' - ')
      })
    },
    // 删除信息
    del (id) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return delMaintenanceApi(id)
      }).then(() => {
        this.getMaintenanceList()
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
        margin: 11px 0 10px;
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
