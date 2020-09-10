<template>
  <div class="user-page page-container">
    <div class="page-search clearfix">
      <el-input
        class="p-s-input"
        v-model.trim="searchOptions.name"
        placeholder="请输入用户名"
        clearable
        size="mini"
      ></el-input>
      <el-input
        class="p-s-input"
        v-model.trim="searchOptions.username"
        placeholder="请输入姓名"
        clearable
        size="mini"
      ></el-input>
      <el-button type="primary" size="mini" class="p-s-btn" @click="query"
        >搜索</el-button
      >
      <div class="p-s-btn-right">
        <el-button type="success" size="mini" title="新建" @click="add"
          >新建</el-button
        >
        <el-button
          class="el_button_reset el_button_reset_batch"
          type="warning"
          size="small"
          @click="initPassword"
          >初始化密码</el-button
        >
      </div>
    </div>
    <div class="page-content">
      <div class="page-content-scroll-warp">
        <el-scrollbar class="scroll-wrap">
          <el-table
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{ 'font-size': '13px' }"
            :cell-style="{ 'font-size': '13px' }"
            v-loading="loading.tableloading"
            @filter-change="filterChange"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              align="center"
              type="selection"
              v-model.trim="multipleSelection"
              width="55"
            ></el-table-column>
            <el-table-column
              align="center"
              type="index"
              fixed
              :index="
                $indexMethod(
                  0,
                  searchOptions.currentPage,
                  searchOptions.pageSize
                )
              "
              label="序号"
              width="80"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="username"
              label="用户名"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="name"
              label="姓名"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="roles"
              label="角色名称"
              show-overflow-tooltip
              :formatter="formatRole"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="unableState"
              label="状态"
              :filters="tableUnableStatefilter"
              filter-placement="bottom"
              :filter-method="tableUnableStatefilterMethod"
              column-key="unableState"
              :formatter="formatUnableState"
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="createUserName"
              label="创建人"
            >
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="210px"
              fixed="right"
            >
             <template slot-scope="scope">
                <el-link  @click.stop="edit(scope.row)" :underline="false" type="warning">编辑</el-link>
                <el-divider direction="vertical"></el-divider>
                <el-link  @click.stop="view(scope.row)" :underline="false" type="info">详情</el-link>
                <el-divider direction="vertical"></el-divider>
                <el-link  @click.stop="del(scope.row)" :underline="false" type="danger">删除</el-link>
            </template>
            </el-table-column>
          </el-table>
          <div class="page-pagination">
              <pagination-comp @currentChange="currentChange" :currentPage="searchOptions.currentPage" :total="searchOptions.total" />
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<script>
import userApi from "@/api/user-api";
export default {
  name: "user-page",
  data() {
    return {
      moreCtrl: true, //更多操作按钮
      multipleSelection: [],
      tableData: [],
      searchOptions: {
        currentPage: 1, //当前页码
        pageSize: 10, //每页显示条数
        total: 0,
        name: "",
        username: ""
      },
      loading: {
        tableloading: true,
      },
      tableRoletypefilter: [],
      tableUnableStatefilter: [
        {
          text: "启用",
          value: 1,
        },
        {
          text: "禁用",
          value: 2,
        },
      ],
    };
  },
  created(){
    this.getList();
  },
  methods: {
    /* table 选择 */
    handleSelectionChange(rows) {
      this.multipleSelection = rows;
    },
    currentChange(val) {
      this.searchOptions.currentPage = val;
      this.getList();
    },
    //查询列表
    getList() {
      var that = this;
      const param = {
        currentPage: that.searchOptions.currentPage,
        pageSize: that.searchOptions.pageSize,
        username: that.searchOptions.name,
        name: that.searchOptions.username
      };
      that.loading.tableloading = true;
      userApi.list(param).then(res => {
          if (res.data.success) {
            that.searchOptions.total = res.data.data.total;
            that.tableData = res.data.data.list;
          } else {
            console.log(res);
          }
          that.loading.tableloading = false;
        })
        .catch((res) => {
          console.log(res);
          that.loading.tableloading = false;
        });
    },
    //连接状态
    formatUnableState: function(row, column, cellValue, index) {
      return cellValue == null || cellValue == "" || cellValue == "2"
        ? "禁用"
        : "启用";
    },
    //角色名称
    formatRole: function(row, column, cellValue, index) {
      var roleNames = [];
      if (cellValue != undefined && cellValue != null && cellValue.length > 0) {
        for (var i = 0; i < cellValue.length; i++) {
          roleNames.push(cellValue[i].name);
        }
      }
      return roleNames.join("、");
    },
    //点击查询按钮
    query() {
      this.searchOptions.currentPage = 1;
      this.getList();
    },
    //单个删除
    del(raw) {
      var that = this;
      this.$confirm(`确定要删除该用户？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then((res) => {
        userApi.deleteUserById(raw.id).then(function(res) {
            if (res.data.success) {
              that.getList();
              that.$notify({
                title: "成功",
                message: "删除成功",
                type: "success",
                duration: 2000,
              });
            } else {
              that.$notify({
                title: "删除失败",
                message: res.data.msg,
                type: "warning",
                duration: 2000,
              });
            }
          })
          .catch(function(res) {
            console.log(res);
          });
      });
    },
    initPassword() {
      var selected = this.multipleSelection;
      var that = this;
      if (selected.length != 1) {
        this.$message({
          message: "请选择一个用户进行密码初始化",
          type: "warning",
        });
        return;
      }
      var param = {
        userId: selected[0].id,
      };
      that.$confirm("确定要初始化密码吗？", "提示", {
          type: "warning",
        }).then(() => {
          userApi.initUserPasswordByIds(param).then(function(res) {
              if (res.data.success) {
                that.getList();
                that.$notify({
                  title: "成功",
                  message: "初始化密码成功",
                  type: "success",
                  duration: 2000,
                });
              } else {
                that.$notify({
                  title: "删除失败",
                  message: res.data.msg,
                  type: "warning",
                  duration: 2000,
                });
              }
            })
            .catch(function(res) {
              console.log(res);
            });
        })
        .catch(() => {});
    },
    // 用户新增
    add() {
      this.$router.push({ name: "user-add-page" });
    },
    // 用户详情
    view(rowinfo) {
      this.$router.push({
        name: "user-view-page",
        query: { type: "view", id: rowinfo.id },
      });
    },
    // 用户编辑
    edit(rowinfo) {
      this.$router.push({
        name: "user-edit-page",
        query: { type: "edit", id: rowinfo.id },
      });
    },
    // table 筛选
    filterChange(filters) {
      this.searchOptions.currentPage = 1;
      this.searchOptions.pageSize = 10;
      if (filters.unableState) {
        const unableState = filters.unableState.join(",");
        this.searchOptions.unableState = unableState;
      }
      this.getList();
    },
    tableUnableStatefilterMethod(value, row, column) {
      return row.unableState === value;
    },
  },
};
</script>
