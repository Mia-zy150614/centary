<template>
    <div class="role-page page-container">
        <div class="page-search clearfix">
            <el-input v-model="searchOptions.name" size="mini" class="p-s-input" placeholder="请输入角色名称" clearable></el-input>
            <el-button type="primary" size="mini" class="p-s-btn" @click="getList">搜索</el-button>
            <div class="p-s-btn-right">
                <el-button type="success" size="mini" title="新建" @click="roleAdd">新建</el-button>
            </div>
        </div>
        <div class="page-content">
            <div class="page-content-scroll-warp">
                <el-scrollbar class="scroll-wrap">
                    <el-table 
                        :data="tableData" 
                        style="width: 100%"
                        header-cell-class-name="custom-el-table-header-class"
                        cell-class-name="custom-el-table-cell-class-name"
                        @selection-change="handleSelectionChange"
                    >
                        <el-table-column align="center" type="selection"  v-model.trim="multipleSelection" width="55"></el-table-column>
                        <el-table-column
                            align="center"
                            type="index"
                            fixed
                            :index="$indexMethod(0,searchOptions.currentPage,searchOptions.pageSize)"
                            label="序号"
                            width="80"
                        ></el-table-column>
                        <el-table-column
                            align="center"
                            prop="name"
                            label="角色名称"
                            >
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="createUserName"
                            label="创建人">
                        </el-table-column>
                        <el-table-column align="center" label="操作">
                            <template slot-scope="scope">
                                <el-link  @click="roleEdit(scope.row)" :underline="false" type="warning">编辑</el-link>
                                <el-divider direction="vertical"></el-divider>
                                <el-link  @click="roleView(scope.row)" :underline="false" type="info">详情</el-link>
                                <el-divider direction="vertical"></el-divider>
                                <el-link  @click="deleteSelect(scope.row)" :underline="false" type="danger">删除</el-link>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页器 -->
                    <div class="page-pagination">
                        <pagination-comp @currentChange="currentChange" :currentPage="searchOptions.currentPage" :total="searchOptions.total" />
                    </div>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>
<script>
import roleApi from "@/api/role-api";
export default {
    name: 'role-page',
    data() {
        return {
            multipleSelection: [],
            searchOptions: {
                name: '',
                currentPage: 1,
                pageSize: 20,
                total: 0
            },
            tableData: []
        }
    },
    created(){
        this.getList();
    },
    methods: {
        //查询列表
        getList() {
            roleApi.list({...this.searchOptions}).then(res => {
                if (res.data.success) {
                    this.searchOptions.total =res.data.data.total;
                    this.tableData = res.data.data.list;
                }
            }).catch(err => console.warn(err));
        },
        currentChange(val) {
            this.searchOptions.currentPage = val;
            this.getList();
        },
        /* table 选择 */
        handleSelectionChange(rows){
            this.multipleSelection = rows;
        },
        // 角色新增
        roleAdd() {
            this.$router.push({name: 'role-add-page'})
        },
        // 角色详情
        roleView(row) {
            this.$router.push({name: 'role-add-page', query: {type: 'view', id: row.id}})
        },
        // 角色编辑
        roleEdit(row) {
            this.$router.push({name: 'role-add-page', query: {type: 'edit', id: row.id}})
        },
        // 删除角色
        deleteSelect(row) {
            
        }
    }
}
</script>