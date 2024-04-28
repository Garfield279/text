<template>
  <el-container>
    <el-main class="main">
      <el-header class="serch">
        <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
          <el-form-item style="margin-right: 650px" prop="name">
            <el-input
              v-model="formInline.name"
              placeholder="学生姓名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="tag">
            <el-select v-model="formInline.tag" placeholder="费用类型">
              <el-option label="罚款费" value="罚款费"></el-option>
              <el-option label="住宿费" value="住宿费"></el-option>
              <el-option label="赔款费" value="赔款费"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="paymentDate">
            <div class="block">
              <el-date-picker
                v-model="formInline.paymentDate"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </div>
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
          费用信息记录
          <SaveDialog></SaveDialog>
        </el-header>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="roomNumber" label="宿舍号" width="180">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="130">
          </el-table-column>
          <el-table-column
            prop="paymentDate"
            label="缴费日期"
            width="240"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="dueDate"
            label="截止日期"
            width="240"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="tag"
            label="费用类型"
            width="160"
            align="center"
          >
            <template slot-scope="{ row }">
              <el-tag :type="getTagType(row.tag)">{{ row.tag }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="amount"
            label="缴费金额"
            align="center"
            width="200"
          >
            <template slot-scope="{ row }"> ￥{{ row.amount }}.00 </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" align="center">
            <template slot-scope="scope">
              <el-row>
                <UpdateDialog :id="scope.row.id"></UpdateDialog>
                <el-link
                  icon="el-icon-delete"
                  type="danger"
                  :underline="false"
                  disabled
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
      </el-main>
    </el-main>
  </el-container>
</template>

<script>
import { paymentPageApi } from '@/api/payment'
import SaveDialog from '@/components/dialogSavePayment.vue'
import UpdateDialog from '@/components/dialogUpdatePayment.vue'
import moment from 'moment'
export default {
  name: 'paymentView',
  components: {
    SaveDialog,
    UpdateDialog
  },
  data () {
    return {
      tableData: [],
      formInline: {
        name: '',
        tag: '',
        paymentDate: '',
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
      getPaymentList: this.getPaymentList
    }
  },
  created () {
    this.getPaymentList()
  },
  methods: {
    handleSizeChange (val) {
      this.formInline.pageSize = val
      this.getPaymentList()
    },
    handleCurrentChange (val) {
      this.formInline.currentPage = val
      this.getPaymentList()
    },
    onSubmit () {
      this.getPaymentList()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.getPaymentList()
    },
    handleNodeClick (data) {
      console.log(data)
    },
    getTagType (tag) {
      // 根据费用类型设置不同的标签样式
      if (tag === '赔款费') {
        return 'success'
      } else if (tag === '罚款费') {
        return 'warning'
      } else {
        return ''
      }
    },
    async getPaymentList () {
      if (this.formInline.paymentDate !== '') {
        this.formInline.paymentDate = moment(this.formInline.paymentDate).format('YYYY-MM-DD')
      }
      const res = await paymentPageApi(this.formInline)
      this.tableData = res.data.data.records
      this.pageTotal = res.data.data.total
      this.tableData.forEach((item) => {
        item.paymentDate = item.paymentDate.replace('T', ' - ')
        item.dueDate = item.dueDate.replace('T', ' - ')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main::v-deep {
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
