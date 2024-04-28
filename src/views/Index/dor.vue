<template>
  <el-container>
    <el-aside width="200px">
      <el-form :inline="true" ref="formInline" class="demo-form-inline">
        <el-form-item prop="buildingNumber">
          <el-select v-model="formInline.buildingNumber" placeholder="宿舍楼栋" @blur="getDorLine()">
            <el-option label="全部" value="0"></el-option>
            <el-option label="楼栋一" value="1"></el-option>
            <el-option label="楼栋二" value="2"></el-option>
            <el-option label="楼栋三" value="3"></el-option>
            <el-option label="楼栋四" value="4"></el-option>
            <el-option label="楼栋五" value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <!-- 信息展示 -->
      <InsertDialog style="margin-left: 10px"></InsertDialog>
      <el-tree
        :data="data"
        :props="defaultProps"
        @node-click="handleNodeClick"
      ></el-tree>
    </el-aside>
    <el-container>
      <el-main>
        <!-- 头部 -->
        <el-header style="height: 80px">
          <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
            <el-form-item style="margin-right: 306px" prop="roomNumber">
              <el-input
                class="input"
                v-model="formInline.roomNumber"
                placeholder="输入宿舍号"
              ></el-input>
            </el-form-item>
            <el-form-item prop="dormitoryType">
              <el-select v-model="formInline.dormitoryType" placeholder="宿舍类型">
                <el-option label="男寝" value="男"></el-option>
                <el-option label="女寝" value="女"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="currentCount">
              <el-select v-model="formInline.currentCount" placeholder="人数状态">
                <el-option label="已满" value="1"></el-option>
                <el-option label="未满" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="resetForm('formInline')">重置</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getDorLine()">查询</el-button>
            </el-form-item>
            <el-form-item style="margin-right: 0">
              <el-button type="primary" @click="getDorLine()">查询全部</el-button>
            </el-form-item>
          </el-form>
        </el-header>
        <!-- 中间表格 -->
        <template>
          <el-table :data="tableData">
            <el-table-column prop="buildingNumber" label="楼栋" width="160">
            </el-table-column>
            <el-table-column prop="roomNumber" label="宿舍号" width="130">
            </el-table-column>
            <el-table-column prop="dormitoryType" label="宿舍类型" width="180" align="center">
            </el-table-column>
            <el-table-column prop="bedCount" label="人数状态" width="180" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.bedCount > scope.row.currentCount" style="color: #0af10a">
                  {{ scope.row.currentCount + '/' + scope.row.bedCount }}
                </span>
                <span v-else style="color: red">
                  {{ scope.row.currentCount + '/' + scope.row.bedCount }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="currentCount" label="宿舍状态" width="180" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.bedCount > scope.row.currentCount" style="color: #0af10a">未满</span>
                <span v-else-if="scope.row.bedCount = scope.row.currentCount" style="color: red">已满</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-row>
                  <UpdateDialog :roomNumber="scope.row.roomNumber"></UpdateDialog>
                  <SelectDialog :roomNumber="scope.row.roomNumber"></SelectDialog>
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    @click="del(scope.row)"
                    disabled
                  ></el-button>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </template>
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
    </el-container>
  </el-container>
</template>

<script>
import InsertDialog from '@/components/dialogSaveDor.vue'
import UpdateDialog from '@/components/dialogUpdateDor.vue'
import SelectDialog from '@/components/dialogSelectDor.vue'
import { getDorListApi, getPageApi } from '@/api/dor'
export default {
  name: 'dorView',
  components: {
    InsertDialog,
    UpdateDialog,
    SelectDialog
  },
  data () {
    return {
      tableData: [],
      data: [
        {
          label: '1号楼',
          children: [
            {
              label: '楼层一'
            },
            {
              label: '楼层二'
            },
            {
              label: '楼层三'
            },
            {
              label: '楼层四'
            }
          ]
        },
        {
          label: '2号楼',
          children: [
            {
              label: '楼层一'
            },
            {
              label: '楼层二'
            }
          ]
        },
        {
          label: '3号楼',
          children: [
            {
              label: '楼层一'
            },
            {
              label: '楼层二'
            }
          ]
        },
        {
          label: '4号楼',
          children: [
            {
              label: '楼层一'
            },
            {
              label: '楼层二'
            }
          ]
        },
        {
          label: '5号楼',
          children: [
            {
              label: '楼层一'
            },
            {
              label: '楼层二'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      formInline: {
        buildingNumber: '',
        roomNumber: '',
        dormitoryType: '',
        currentCount: '',
        pageSize: 5,
        currentPage: 1
      },
      pageTotal: 100,
      dialogFormVisible: false
    }
  },
  provide () {
    return {
      getDorLine: this.getDorLine
    }
  },
  created () {
    this.getDorLine()
  },
  methods: {
    handleSizeChange (val) {
      this.formInline.pageSize = val
      this.getDorLine()
    },
    handleCurrentChange (val) {
      this.formInline.currentPage = val
      this.getDorLine()
    },
    onSubmit () {
      console.log('submit!')
    },
    handleNodeClick (data) {
      console.log(data)
    },
    resetForm (formName) {
      console.log(formName)
      this.$refs[formName].resetFields()
    },
    async getDorList () {
      const res = await getDorListApi()
      this.tableData = res.data.data
    },
    async getDorLine () {
      const res = await getPageApi(this.formInline)
      this.tableData = res.data.data.records
      this.pageTotal = res.data.data.total
    },
    del (row) {
      console.log(row)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 0 10px;
  .el-form {
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }
}
.el-aside {
  background-color: #fff;
  .el-form-item {
    margin: 10px;
  }
  .el-tree {
    padding-left: 15px;
  }
}
.el-main {
  background-color: #f7f9fb;
  padding: 20px 40px;
}
.el-pagination {
  padding: 15px 0px;
  float: right;
}

/* 菜单 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 170px;
}

.el-menu-item [class^=el-icon-] {
  margin-right: 10px !important;
}

.el-menu {
  border-right: solid 1.5px #e6e6e6 !important;
}
</style>
