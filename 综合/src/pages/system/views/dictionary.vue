<template>
    <div class="dictionary-page page-container">
        <div class="page-search clearfix">
            <el-input class="p-s-input" v-model.trim="searchOptions.name" placeholder="请输入字段名称" size="mini" clearable></el-input>
            <el-select class="p-s-input" size="mini" v-model.trim="searchOptions.type" placeholder="请选择字段类型" clearable>
                <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                    {{item.name}}
                </el-option>
            </el-select>
            <el-button type="primary" size="mini" class="p-s-btn" @click="getList">搜索</el-button>
            <div class="p-s-btn-right">
                <el-button type="success" size="mini" title="新建" @click="add">新建</el-button>
                <el-button type="warning" size="mini" title="清除缓存" @click="refresh">清除缓存</el-button>
                <el-button type="primary" size="mini" title="导出" @click="exportExcel">导出</el-button>
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
                            show-overflow-tooltip
                            label="字段名称">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="typeName"
                            show-overflow-tooltip
                            label="字段类型">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="orderNum"
                            show-overflow-tooltip
                            label="字段序号">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="remark"
                            show-overflow-tooltip
                            label="备注">
                        </el-table-column>
                        <el-table-column align="center" label="操作">
                            <template slot-scope="scope">
                                <el-link  @click="edit(scope.row)" :underline="false" type="warning">编辑</el-link>
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
import dictDataApi from "@/api/dictdata-api";
export default {
    name: 'dictionary-page',
    data() {
        return {
            typeOptions: [],
            multipleSelection: [],
            tableData: [],
            searchOptions: {
                currentPage: 1, //当前页码
                pageSize: 20, //每页显示条数
                total: 0,
                name: "",
                type: "",
                total: 0
            },
        }
    },
    created() {
        this.getDictList()
        this.getList()
    },
    methods: {
        /* table 选择 */
        handleSelectionChange(rows){
            this.multipleSelection = rows;
        },
        currentChange(val) {
            this.searchOptions.currentPage = val;
            this.getList();
        },
        getDictList() {
            dictDataApi.queryByModel({type: '60'}).then(res => {
                this.typeOptions = res.data.data;
                this.typeOptions.push({name: "字典类型", value: "60"});
            });
        },
        getList() {
            const {currentPage,pageSize,name,type} = this.searchOptions
            dictDataApi.list({currentPage,pageSize,name,type}).then( res => {
                if (res.data.success) {
                    this.searchOptions.total =res.data.data.total;
                    this.tableData = res.data.data.list;
                }else{
                    console.log(res);
                }
            }).catch(function (res) {
                console.log(res);
            });
        },
        /* 新建 */
        add() {
            this.$router.push({name: 'dictionary-add-page'})
        },
        /* 编辑 */
        edit(row) {
            this.$confirm(`数据字典编辑对系统影响较大，是否继续？`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(
                resolve => this.$router.push({name: 'dictionary-edit-page', query: { type:'edit', id: row.id}})
            ).catch(err => console.log(err))
            
        },
        /* 清除缓存 */
        refresh() {
            this.$confirm(`确定要清除系统缓存吗，是否继续？`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(resolve => {
                dictDataApi.clearCache().then(res =>{
                    if(res.data.success) {
                        this.$notify({
                            title: "成功",
                            message: "已清除缓存！",
                            type: "success",
                            duration: 2000
                        });
                    } else {
                        this.$notify({
                            title: "失败",
                            message: "清除缓存失败！",
                            type: "warning",
                            duration: 2000
                        });
                    }
                }).catch(err => console.log(err))
            }).catch(err => console.log(err));
        },
        /* 导出 */
        exportExcel() {
            this.$confirm(`确定要导出吗，是否继续？`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(resolve => {
                const {name, type} = this.searchOptions
                dictDataApi.exportExcel({name, type}).then( res => {
                    this.$notify({
                        title: "提示",
                        message: "导出成功",
                        type: "success",
                        duration: 2000
                    });
                }).catch(err => {
                    this.$notify({
                        title: "提示",
                        message: "导出失败",
                        type: "warning",
                        duration: 2000
                    });
                });
            }).catch(err => console.log(err));
        }
    }
}
</script>