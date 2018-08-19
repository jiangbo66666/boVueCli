<template>
  <div class="user">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <!-- 给组件绑定原生事件的话，需要一个.native的修饰符 -->
        <el-input placeholder="请输入内容" v-model="search" class="search-input">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain @click='adduserdialogFormVisible=true'>添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="users" border style="width: 100%">
      <el-table-column type="index" label="索引" width="60">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column prop="mobile" label="手机号">
      </el-table-column>
      <el-table-column label="用户状态" width="100">
        <template slot-scope="scope">
          <el-switch v-model='scope.row.mg_state' @change='changeusercontrol(scope)'></el-switch>
        </template>
      </el-table-column>
      <el-table-column label='操作用户'>
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click ='edit(scope)'></el-button>
          <el-button type="success" icon="el-icon-check" circle ></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click='del(scope)'></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[1, 2, 3, 4]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="添加用户" :visible.sync="adduserdialogFormVisible">
      <el-form :model="addform" :rules="rules" ref="addform" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addform.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addform.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addform.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="addform.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adduserdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="adduserdialogFormsure('addform')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑用户" :visible.sync="edituserdialogFormVisible">
      <el-form :model="editform" :rules="rules" ref="editform" label-width="100px" class="demo-ruleForm" >
        <el-form-item label="用户名" prop="username" >
          <el-input v-model="editform.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editform.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="editform.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="edituserdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edituserdialogFormsure('editform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  userList,
  changeuserzt,
  adduserinfomation,
  deluser
} from "../../api/api.js";
export default {
  data() {
    return {
      search: "",
      currentPage4: 1,
      users: [],
      pagesize: 4,
      pagenum: 1,
      value: true,
      adduserdialogFormVisible: false,
      edituserdialogFormVisible:false,
      total: 1,
      addform: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      editform: {
        username: "",
        email: "",
        mobile: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 18, message: "长度在 3 到 18 个字符", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱地址", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号码", trigger: "blur" }]
      }
    };
  },
  methods: {
    adduserdialogFormsure(forname) {
      this.$refs[forname].validate(valid => {
        if (valid) {
          adduserinfomation(this.addform).then(res => {
            if (res.meta.status == 201) {
              this.addsuccess();
              this.adduserdialogFormVisible = false;
              this.getuserlist();
              this.$refs[forname].resetFields();
            } else {
              this.adddefeated();
            }
          });
        } else {
          this.formnotfull();
        }
      });
    },
    formnotfull() {
      this.$message.error("请把表单填写完整");
    },
    changedefeated() {
      this.$message.error("修改用户状态失败");
    },
    adddefeated() {
      this.$message.error("添加用户失败");
    },
    changesuccess() {
      this.$message({
        message: "修改状态成功",
        type: "success"
      });
    },
    addsuccess() {
      this.$message({
        message: "添加信息成功",
        type: "success"
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getuserlist();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getuserlist();
    },
    getuserlist() {
      userList({
        params: { query: "", pagesize: this.pagesize, pagenum: this.pagenum }
      }).then(res => {
        this.total = res.data.total;
        console.log(res.data)
        this.users = res.data.users;
      });
    },
    changeusercontrol(add) {
      changeuserzt(add.row.id, add.row.mg_state).then(res => {
        if (res.meta.status == 200) {
          this.changesuccess();
        } else {
          this.changedefeated();
        }
      });
    },
    del(scope) {
      this.$confirm("此操作将永久该用户, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delusermsg(scope)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    delusermsg(scope) {
      console.log(scope);
      deluser(scope.row.id).then(res => {
        if (res.meta.status == 200) {
          this.$message({
            message: "删除信息成功",
            type: "success"
          });
          this.getuserlist();
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    edit(scope){
      this.edituserdialogFormVisible=true
      this.editform.username = scope.row.username
      this.editform.email = scope.row.email
      this.editform.mobile = scope.row.mobile
    }
  },
  mounted() {
    this.getuserlist();
  }
};
</script>

<style lang="scss" scoped>
.user {
  .margin-20 {
    margin: 20px 0;
  }
  .search-input {
    width: 300px;
  }
  .page {
    padding: 5px 0;
    background-color: #d3dce6;
  }
}
</style>
