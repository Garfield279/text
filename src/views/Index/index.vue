<template>
  <el-container>
    <!-- 页面左模块 -->
    <!-- <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <div class="menu-head">
        <el-button icon="el-icon-s-fold" circle @click="Collapse"></el-button>
      </div>

      <router-link to="/home">
        <el-menu-item index="1">
          <i class="el-icon-house"></i>
          <span slot="title">首页</span>
        </el-menu-item>
      </router-link>

      <router-link to="/dor">
        <el-menu-item index="2">
          <i class="el-icon-office-building"></i>
          <span slot="title">宿舍管理</span>
        </el-menu-item>
      </router-link>

      <router-link to="/student">
        <el-menu-item index="3">
          <i class="el-icon-user"></i>
          <span slot="title">学生信息</span>
        </el-menu-item>
      </router-link>

      <router-link to="cleanl">
        <el-menu-item index="4">
          <i class="el-icon-document"></i>
          <span slot="title">卫生统计</span>
        </el-menu-item>
      </router-link>

      <router-link to="payment">
        <el-menu-item index="5">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">费用记录</span>
        </el-menu-item>
      </router-link>

      <router-link to="maintenance">
        <el-menu-item index="6">
          <i class="el-icon-document-copy"></i>
          <span slot="title">维修记录</span>
        </el-menu-item>
      </router-link>

      <router-link to="remark">
        <el-menu-item index="7">
          <i class="el-icon-setting"></i>
          <span slot="title">备注</span>
        </el-menu-item>
      </router-link>

      <router-link to="/my">
        <el-menu-item index="8">
          <i class="el-icon-setting"></i>
          <span slot="title">我的</span>
        </el-menu-item>
      </router-link>
    </el-menu> -->

    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <div class="menu-head">
        <el-button icon="el-icon-s-fold" circle @click="Collapse"></el-button>
      </div>
      <router-link v-for="item in routes" :key="item.path" :to="item.path">
        <el-menu-item>
          <i :class="item.meta.icon"></i>
          <span slot="title">{{ item.meta.title }}</span>
        </el-menu-item>
      </router-link>
    </el-menu>

    <!-- 页面右模块 -->
    <el-container>
      <el-header>
        <div class="header-left"><h5>宿舍管理系统</h5></div>
        <div class="header-right">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              <el-avatar :size="40" :src="circleUrl"></el-avatar>
              <span class="name">王立国</span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                icon="el-icon-circle-plus"
                @click="getUserInfo"
                command="a"
                >个人信息</el-dropdown-item
              >
              <el-dropdown-item
                icon="el-icon-circle-plus-outline"
                command="b"
                @click="logOut"
                >退出</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <el-main>
        <!-- 路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getToken, removeToken } from "@/utils/auth";
import { getByIdApi } from "@/api/my";
export default {
  name: "indexView",
  data() {
    return {
      isCollapse: false,
      circleUrl: "",
      routes: [],
    };
  },
  created() {
    this.getRouter();
    // this.getById();
  },
  mounted() {},
  methods: {
    async getById() {
      const res = await getByIdApi(window.sessionStorage.getItem("id"));
      this.circleUrl = res.data.data.avatar;
      window.sessionStorage.setItem("id", res.data.data.id);
    },
    handleCommand(command) {
      console.log(command);
      if (command === "b") {
        this.logOut();
      } else if (this.$route.path != "/my") {
        console.log(this.$route.path);
        this.$router.push("/my");
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    Collapse() {
      this.isCollapse = !this.isCollapse;
    },
    // 退出登录
    logOut() {
      removeToken();
      const token = getToken();
      if (!token) this.$router.push("/login");
    },
    getUserInfo() {
      console.log(123);
    },
    getRouter() {
      const routes = this.$router.options.routes;
      routes.map((item) => {
        if (item.children) {
          this.routes = item.children;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #fff;
}
.el-aside {
  background-color: #d3dce6;
  text-align: center;
}
.el-main {
  background-color: #f7f9fb;
  padding: 0 !important;
}
#app > .el-container {
  height: 100% !important;
}

/* 菜单 */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 170px;
}

.el-menu-item [class^="el-icon-"] {
  margin-right: 10px !important;
}

.el-menu {
  border-right: solid 1.5px #e6e6e6 !important;
}
.el-container.is-vertical {
  flex-direction: column;
  width: 90%;
}
.menu-head {
  height: 60px;
  padding: 0 11px;
  color: #909399;

  .el-button {
    font-size: 18px !important;
    margin-top: 9px;
    cursor: pointer;
  }
}

.el-header {
  border-bottom: solid 1.5px #e9e9e9;
  display: flex;
  .header-left,
  .header-right {
    display: inline-block;
    height: 100%;
    line-height: 60px;
  }
  .header-left {
    width: 91%;
    border-right: solid 2px #e9e9e9;
  }
  .header-right {
    width: 9%;
    text-align: center;
    .el-dropdown {
      height: 40px;
      margin-top: 10px;
      padding-left: 20px;
    }
    .name {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      cursor: pointer;
    }
    .el-dropdown-link {
      display: flex;
      height: 40px;
    }
  }
}
</style>
