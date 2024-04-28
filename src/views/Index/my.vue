<template>
  <el-container class="box">
    <el-main class="main">
      <el-main class="table">
        <el-container class="center">
          <el-main>
            <el-descriptions title="用户信息" :column="1">
              <el-descriptions-item label="头像">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false" disabled
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload >
              </el-descriptions-item>
              <el-descriptions-item label="用户"
                >王立国</el-descriptions-item
              >
            </el-descriptions>
            <UpdatePwd></UpdatePwd>
            <UpdataAvatar @getImageUrl="setImageUrl"></UpdataAvatar>
          </el-main>
        </el-container>
      </el-main>
    </el-main>
  </el-container>
</template>

<script>
import UpdatePwd from '@/components/dialogSavePwd.vue'
import UpdataAvatar from '@/components/dialogSaveAvatar.vue'
import { getByIdApi } from '@/api/my'
export default {
  name: 'remarkView',
  components: {
    UpdataAvatar,
    UpdatePwd
  },
  data () {
    return {
      stuTableData: [],
      dorTableData: [],
      imageUrl: ''
    }
  },
  created () {
    this.getById()
  },
  methods: {
    async getById () {
      const res = await getByIdApi(window.sessionStorage.getItem("id"))
      this.imageUrl = res.data.data.avatar
    },
    setImageUrl (data) {
      this.imageUrl = data
    },
    onSubmit () {
      console.log(this.$store.state.id)
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
  .table {
    background-color: #fff;
  }
  .center::v-deep {
    .el-main {
      padding: 0;
    }
    .el-descriptions :not(.is-bordered) .el-descriptions-item__cell {
      padding-bottom: 50px !important;
    }
    .el-descriptions__header {
      margin-bottom: 45px;
    }
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
