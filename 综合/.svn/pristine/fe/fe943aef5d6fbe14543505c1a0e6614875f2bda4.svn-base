<template>
    <div class="management-page page-container">
        <div class="page-search clearfix">
            <el-input class="p-s-input" size="mini" v-model.trim="searchOptions.name" placeholder="请输入操作用户" clearable></el-input>
            <el-button type="primary" size="mini" class="p-s-btn" @click="getList">搜索</el-button>
            <el-popover placement="bottom" trigger="click" popper-class="high-search-popover" ref="high-search-popover">
                <el-button :type="isHighSearch?'primary': null" size="mini" slot="reference" class="p-s-high-search">
                    <svg class="icon-svg" aria-hidden="true">
                        <use xlink:href="#icon-highsearch"></use>
                    </svg>
                    <span>高级搜索</span>
                </el-button>
                <div class="high-search-content">
                    <el-form ref="high-search-popover-form" label-width="80px" :model="searchOptions" label-position="right" class="high-search-popover-form">
                        <el-form-item label="用户：" prop="name">
                            <el-input size="mini" v-model.trim="searchOptions.name" placeholder="请输入操作用户" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="时间：" prop="time">
                            <el-date-picker
                                v-model="searchOptions.time"
                                type="daterange"
                                size="mini"
                                range-separator="-"
                                value-format="yyyy-MM-dd"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="执行结果：" prop="result">
                            <el-select size="mini" v-model="searchOptions.result" style="width: 100%" placeholder="请选择执行结果" clearable>
                                <el-option label="成功" value="0000"></el-option>
                                <el-option label="失败" value="2000"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div class="high-search-popover-form-submit">
                        <el-button type="primary" size="mini" class="p-s-btn" @click="$hideSubmit(getList, $refs['high-search-popover'])">确定</el-button>
                        <el-button type="info" size="mini" class="p-s-btn" @click="$hideReset($refs['high-search-popover-form'].resetFields)">重置</el-button>
                    </div>
                </div>
            </el-popover>
            <div class="p-s-btn-right">
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
                            prop="username"
                            label="操作用户"
                        >
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="ip"
                            label="操作IP">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="systemName"
                            label="系统名称">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="module"
                            label="操作模块"
                            show-overflow-tooltip
                            :formatter="formatModule">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="operation"
                            show-overflow-tooltip
                            label="操作内容">
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="result"
                            label="执行结果"
                            column-key="result"
                        >
                            <template slot-scope="scope">
                                <span class="table-column-success" v-if="scope.row.result === '0000'">成功</span>
                                <span class="table-column-fail" v-if="scope.row.result === '2000'">失败</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            prop="logTime"
                            label="操作时间"
                            width="180">
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
import managementApi from "@/api/management-api";
import { validateIsHighSearch } from '@/utils/validate'
export default {
    name: 'management-page',
    data() {
        return {
            multipleSelection: [],
            searchOptions: {
                currentPage: 1, //当前页码
                pageSize: 20, //每页显示条数
                total: 0,
                name: "",
                result: "",
                time: []
            },
            tableData: [],
            isHighSearch: false
        }
    },
    created() {
        this.showModulars()
        this.getList()
    },
    watch: {
        'searchOptions': {
            handler(item) {
                this.isHighSearch = validateIsHighSearch(item, 'name')
            },
            deep: true
        }
    },
    methods: {
        /* 搜索 */
        getList() {
            const param = {
                currentPage: this.searchOptions.currentPage,
                pageSize: this.searchOptions.pageSize,
                name: this.searchOptions.name,
                startTime: this.searchOptions.time[0],
                endTime: this.searchOptions.time[1],
                result: this.searchOptions.result,
            };
            managementApi.list(param).then(res => {
                const data = res.data.data
                if(data) {
                    this.searchOptions.total = data.total;
                    this.tableData = data.list;
                }
            }).catch(err => console.warn(err));
        },
        /* 导出 */
        exportExcel() {
            this.$confirm(`确定要导出吗，是否继续？`, "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(resolve => {
                const {name, result, time: [startTime,endTime]} = this.searchOptions
                const param = { startTime, endTime, name, result };
                managementApi.exportExcel(param).then( res => {
                    this.$notify({
                        title: "提示",
                        message: "导出成功",
                        type: "success",
                        duration: 2000
                    });
                }).catch( err => {
                    this.$notify({
                        title: "提示",
                        message: "导出失败",
                        type: "warning",
                        duration: 2000
                    });
                });
            }).catch(err => console.log(err));
        },
        /* table 选择 */
        handleSelectionChange(rows){
            this.multipleSelection = rows;
        },
        currentChange(val) {
            this.searchOptions.currentPage = val;
            this.getList();
        },
        //操作模块
        formatModule: function (row, column, cellValue, index) {
            var ret = cellValue;
            if (this.modulars != null) {
                if (this.modulars[ret] != null && this.modulars[ret] != "") {
                    ret = this.modulars[ret];
                }
            }
            return ret;
        },
        showModulars() {
            managementApi.queryAllModule().then( res => {
                if (res.data.success) {
                    this.modulars = res.data.data;
                } else {
                    this.modulars = [];
                }
            }).catch(err => console.warn(err));
        },
    }
}
</script>