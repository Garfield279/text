<template>
  <el-container class="main">
    <el-container>
      <el-main>
        <el-header>
          <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
            <el-form-item style="margin-right: 229px" prop="dormitoryId">
              <el-input
                v-model="formInline.dormitoryId"
                placeholder="输入宿舍号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="data">
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
            <el-form-item prop="cleanlinessLevel">
              <el-select
                v-model="formInline.cleanlinessLevel"
                placeholder="卫生状况"
              >
                <el-option label="优秀" value="优秀"></el-option>
                <el-option label="良好" value="良好"></el-option>
                <el-option label="一般" value="一般"></el-option>
                <el-option label="差" value="差"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="resetForm('formInline')">查询全部</el-button>
            </el-form-item>
            <SelectDialog></SelectDialog>
          </el-form>
        </el-header>
        <template>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="data" label="日期" width="150">
            </el-table-column>
            <el-table-column prop="dormitoryId" label="宿舍号" align="center">
            </el-table-column>
            <el-table-column
              prop="cleanlinessLevel"
              label="卫生状况"
              align="center"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.cleanlinessLevel === '差'" style="color: red"
                  >差</span
                >
                <span
                  v-else-if="scope.row.cleanlinessLevel === '一般'"
                  >一般</span
                >
                <span
                  v-else-if="scope.row.cleanlinessLevel === '良好'"
                  style="color: #f7ca5d"
                  >良好</span
                >
                <span
                  v-else-if="scope.row.cleanlinessLevel === '优秀'"
                  style="color: #0af10a"
                  >优秀</span
                >
              </template>
            </el-table-column>
            <el-table-column prop="address" label="操作" align="center">
              <template slot-scope="scope">
                <el-row>
              <!-- <el-link icon="el-icon-edit" type="primary" :underline="false"
                >编辑</el-link
              > -->
              <UpdateDialog :id="scope.row.id"></UpdateDialog>
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
              :page-sizes="[5, 10, 15]"
              :page-size="formInline.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageTotal"
            >
            </el-pagination>
          </el-footer>
        </template>
      </el-main>
    </el-container>
    <el-aside width="400px">
      <div id="main" ref="a" style="width: 99%; height: 500px; margin-top: 35px"></div>
    </el-aside>
  </el-container>
</template>

<script>
import SelectDialog from '@/components/dialogSaveClean.vue'
import UpdateDialog from '@/components/dialogUpdateClean.vue'
import { getPageApi, getEchartsApi, delCleanApi } from '@/api/clean'
import * as echarts from 'echarts'
import moment from 'moment'
export default {
  name: 'cleanlView',
  components: {
    SelectDialog,
    UpdateDialog
  },
  data () {
    return {
      Echarts: [],
      tableData: [],
      formInline: {
        id: '',
        dormitoryId: '',
        data: '',
        cleanlinessLevel: '',
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
      },
      chart: {
        title: {
          text: '优秀宿舍卫生统计',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '70%'],
            // adjust the start and end angle
            startAngle: 180,
            endAngle: 360,
            data: [
              { value: 1048, name: '1号楼' },
              { value: 735, name: '2号楼' },
              { value: 580, name: '3号楼' },
              { value: 484, name: '4号楼' },
              { value: 300, name: '5号楼' }
            ]
          }
        ]
      }
    }
  },
  created () {
    this.getCleanList()
  },
  provide () {
    return {
      getCleanList: this.getCleanList
    }
  },
  methods: {
    handleSizeChange (val) {
      this.formInline.pageSize = val
      this.getCleanList()
    },
    handleCurrentChange (val) {
      this.formInline.currentPage = val
      this.getCleanList()
    },
    onSubmit () {
      this.getCleanList()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.getCleanList()
    },
    handleNodeClick (data) {
      console.log(data)
    },
    // 获取表格数据
    async getCleanList () {
      if (this.formInline.data !== '') {
        this.formInline.data = moment(this.formInline.data).format('YYYY-MM-DD')
      }
      const res = await getPageApi(this.formInline)
      this.tableData = res.data.data.records
      this.pageTotal = res.data.data.total
    },
    // 获取图表数据
    async getEcharts () {
      const res = await getEchartsApi()
      this.chart.series[0].data = res.data.data

      const charts = echarts.init(this.$refs.a)

      charts.setOption(this.chart)
    },
    // 删除信息
    del (id) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return delCleanApi(id)
      }).then(() => {
        this.getCleanList()
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
  },
  mounted () {
    this.getEcharts()
  }
}
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
}

.el-main {
  padding: 20px 40px;
}

.el-header {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 20px 10px;
  height: 80px !important;
  form {
    display: flex;
    justify-content: center;
  }
}

.el-aside {
  border-left: 1.5px solid #e6e6e6;
}

.el-aside,
.el-footer {
  background-color: #fff;
}

.el-footer {
  padding: 0 10px;
  .el-pagination {
    padding: 15px 0px;
    float: right;
  }
}
.el-link {
  padding-right: 20px;
}

</style>
