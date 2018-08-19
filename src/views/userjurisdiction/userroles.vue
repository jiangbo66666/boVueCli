<template>
  <div class="rights">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">权限管理</el-breadcrumb-item>
          <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-button type="primary" plain>添加用户</el-button>
    <el-table border :data="userlist" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="firstChildren in scope.row.children" :key="firstChildren.id">
            <el-col :span="4">
              <div></div>
              <el-tag type="" :disable-transitions="false" closable @close="deluserrig(scope.row,firstChildren.id)">
                {{firstChildren.authName}}
              </el-tag>
              <i class="el-icon-arrow-right" v-if="firstChildren.children.length !== 0"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="secondChildren in firstChildren.children" :key="secondChildren.id">
                <el-col :span="4">
                  <el-tag type="success" :disable-transitions="false" closable @close="deluserrig(scope.row,secondChildren.id)">
                    {{secondChildren.authName}}
                  </el-tag>
                  <i class="el-icon-arrow-right" v-if="secondChildren.children.length !== 0"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag type="warning" :disable-transitions="false" closable v-for="thirdChildren in secondChildren.children" @close="deluserrig(scope.row,thirdChildren.id)" :key="thirdChildren.id">
                    {{thirdChildren.authName}}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="角色名称" prop="roleName" width="160">
      </el-table-column>
      <el-table-column label="描述" prop="roleDesc" width="200">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain></el-button>
          <el-button type="success" icon="el-icon-check" plain @click='showusertree(scope)'></el-button>
          <el-button type="danger" icon="el-icon-delete" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="用户权限树状图" :visible.sync="treeFormVisible">
      <el-tree :data="data2" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps" 
  :default-checked-keys="keys">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="treeFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="treeFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { userroles, deluserrights ,allrightslist} from "../../api/api.js";

export default {
  data() {
    return {
      userlist: [],
      treeFormVisible: false,
      data2: [],
      keys:[],
      defaultProps: {
        children: "children",
        label: "authName"
      }
    };
  },
  mounted() {
    userroles().then(res => {
      this.userlist = res.data;
      console.log(res.data);
    });
  },
  methods: {
    deluserrig(row, rolesid) {
      // deluserrights
      console.log(row);
      console.log(rolesid);
      deluserrights({ rolesid: row.id, rightid: rolesid }).then(
        res => (row.children = res.data)
      );
    },
    showusertree(scope) {
      this.treeFormVisible = true;
      allrightslist('tree').then(res=>{
        this.data2=res.data
      })
      // console.log(scope.row.children)
      let child = scope.row.children
      this.keys.length = 0
      child.forEach((one)=>{
        one.children.forEach(two=>{
          two.children.forEach((three)=>{
            // console.log(three.id)
            this.keys.push(three.id)
          })
        })
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
